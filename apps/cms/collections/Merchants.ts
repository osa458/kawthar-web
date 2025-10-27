import { CollectionConfig } from 'payload/types'

export const Merchants: CollectionConfig = {
  slug: 'merchants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator', 'merchant'].includes(user.role)
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator'].includes(user.role) || 
               (user.role === 'merchant' && user.organization === user.id)
      }
      return false
    },
    delete: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator'].includes(user.role)
      }
      return false
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Food & Beverage',
          value: 'food-beverage',
        },
        {
          label: 'Retail',
          value: 'retail',
        },
        {
          label: 'Services',
          value: 'services',
        },
        {
          label: 'Technology',
          value: 'technology',
        },
        {
          label: 'Health & Wellness',
          value: 'health-wellness',
        },
        {
          label: 'Entertainment',
          value: 'entertainment',
        },
      ],
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Suspended',
          value: 'suspended',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        // Webhook to revalidate frontend
        if (doc.status === 'published') {
          fetch(`${process.env.PUBLIC_SITE_ORIGIN}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REVALIDATE_SECRET}`,
            },
            body: JSON.stringify({
              type: 'merchant',
              id: doc.id,
            }),
          }).catch(console.error)
        }
      },
    ],
  },
}
