import { CollectionConfig } from 'payload'

export const Recurrences: CollectionConfig = {
  slug: 'recurrences',
  admin: {
    useAsTitle: 'name',
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'frequency',
      type: 'select',
      options: [
        {
          label: 'Daily',
          value: 'daily',
        },
        {
          label: 'Weekly',
          value: 'weekly',
        },
        {
          label: 'Monthly',
          value: 'monthly',
        },
        {
          label: 'Yearly',
          value: 'yearly',
        },
      ],
      required: true,
    },
    {
      name: 'interval',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
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
          label: 'Paused',
          value: 'paused',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
}
