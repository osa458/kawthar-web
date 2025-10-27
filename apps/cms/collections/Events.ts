import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator', 'organizer'].includes(user.role)
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator'].includes(user.role) ||
               (user.role === 'organizer' && user.organization === user.id)
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Community',
          value: 'community',
        },
        {
          label: 'Business',
          value: 'business',
        },
        {
          label: 'Educational',
          value: 'educational',
        },
        {
          label: 'Social',
          value: 'social',
        },
        {
          label: 'Cultural',
          value: 'cultural',
        },
      ],
      required: true,
    },
    {
      name: 'maxAttendees',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
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
          label: 'Cancelled',
          value: 'cancelled',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'draft',
      required: true,
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
              type: 'event',
              id: doc.id,
            }),
          }).catch(console.error)
        }
      },
    ],
  },
}
