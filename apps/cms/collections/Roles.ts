import { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'name',
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
        return ['admin'].includes(user.role)
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) {
        return ['admin'].includes(user.role)
      }
      return false
    },
    delete: ({ req: { user } }) => {
      if (user) {
        return ['admin'].includes(user.role)
      }
      return false
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'permissions',
      type: 'array',
      fields: [
        {
          name: 'resource',
          type: 'text',
          required: true,
        },
        {
          name: 'actions',
          type: 'array',
          fields: [
            {
              name: 'action',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
