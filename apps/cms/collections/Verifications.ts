import { CollectionConfig } from 'payload'

export const Verifications: CollectionConfig = {
  slug: 'verifications',
  admin: {
    useAsTitle: 'type',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator'].includes(user.role)
      }
      return false
    },
    create: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator'].includes(user.role)
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) {
        return ['admin', 'moderator'].includes(user.role)
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
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Organization',
          value: 'organization',
        },
        {
          label: 'Event',
          value: 'event',
        },
        {
          label: 'Merchant',
          value: 'merchant',
        },
        {
          label: 'Product',
          value: 'product',
        },
      ],
      required: true,
    },
    {
      name: 'entityId',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Verified',
          value: 'verified',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'verifiedBy',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'verifiedAt',
      type: 'date',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
