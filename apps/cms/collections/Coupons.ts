import { CollectionConfig } from 'payload/types'

export const Coupons: CollectionConfig = {
  slug: 'coupons',
  admin: {
    useAsTitle: 'code',
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
        return ['admin', 'moderator', 'merchant'].includes(user.role)
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
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'discountType',
      type: 'select',
      options: [
        {
          label: 'Percentage',
          value: 'percentage',
        },
        {
          label: 'Fixed Amount',
          value: 'fixed',
        },
      ],
      required: true,
    },
    {
      name: 'discountValue',
      type: 'number',
      required: true,
    },
    {
      name: 'minimumAmount',
      type: 'number',
    },
    {
      name: 'maximumDiscount',
      type: 'number',
    },
    {
      name: 'validFrom',
      type: 'date',
      required: true,
    },
    {
      name: 'validUntil',
      type: 'date',
      required: true,
    },
    {
      name: 'usageLimit',
      type: 'number',
    },
    {
      name: 'usedCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'merchant',
      type: 'relationship',
      relationTo: 'merchants',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
        {
          label: 'Expired',
          value: 'expired',
        },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
}
