import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
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
      name: 'merchant',
      type: 'relationship',
      relationTo: 'merchants',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'originalPrice',
      type: 'number',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'stockQuantity',
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
          label: 'Out of Stock',
          value: 'out-of-stock',
        },
        {
          label: 'Discontinued',
          value: 'discontinued',
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
              type: 'product',
              id: doc.id,
            }),
          }).catch(console.error)
        }
      },
    ],
  },
}
