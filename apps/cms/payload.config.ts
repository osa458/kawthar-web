import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor({}),
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'events',
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
          name: 'date',
          type: 'date',
          required: true,
        },
      ],
    },
  ],
})

