import { CollectionConfig } from 'payload'

export const AbuseReports: CollectionConfig = {
  slug: 'abuse-reports',
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
    create: () => true,
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
          label: 'Spam',
          value: 'spam',
        },
        {
          label: 'Inappropriate Content',
          value: 'inappropriate',
        },
        {
          label: 'Fake Information',
          value: 'fake',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'reportedEntityType',
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
      name: 'reportedEntityId',
      type: 'text',
      required: true,
    },
    {
      name: 'reporterEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Open',
          value: 'open',
        },
        {
          label: 'Under Review',
          value: 'review',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
        {
          label: 'Dismissed',
          value: 'dismissed',
        },
      ],
      defaultValue: 'open',
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'resolutionNotes',
      type: 'textarea',
    },
  ],
}
