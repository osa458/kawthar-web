import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Kawthar CMS',
      favicon: '/favicon.ico',
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor({}),
  cors: [
    'https://kawthar.app',
    'https://www.kawthar.app',
    'https://cms.kawthar.app',
  ],
  csrf: [
    'https://kawthar.app',
    'https://www.kawthar.app',
    'https://cms.kawthar.app',
  ],
  collections: [
    // Users with authentication
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Moderator', value: 'moderator' },
            { label: 'Organizer', value: 'organizer' },
            { label: 'Merchant', value: 'merchant' },
          ],
          defaultValue: 'organizer',
          required: true,
        },
      ],
    },
    // Organizations
    {
      slug: 'organizations',
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'neighborhood',
          type: 'text',
          required: true,
        },
      ],
    },
    // Events
    {
      slug: 'events',
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'richText',
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
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'neighborhood',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Cultural', value: 'cultural' },
            { label: 'Religious', value: 'religious' },
            { label: 'Social', value: 'social' },
            { label: 'Educational', value: 'educational' },
            { label: 'Business', value: 'business' },
          ],
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'capacity',
          type: 'number',
          required: true,
        },
        {
          name: 'organizer',
          type: 'relationship',
          relationTo: 'organizations',
          required: true,
        },
      ],
    },
    // Merchants
    {
      slug: 'merchants',
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'neighborhood',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Food & Beverage', value: 'food-beverage' },
            { label: 'Fashion & Accessories', value: 'fashion-accessories' },
            { label: 'Home & Garden', value: 'home-garden' },
            { label: 'Electronics', value: 'electronics' },
            { label: 'Books & Media', value: 'books-media' },
            { label: 'Health & Beauty', value: 'health-beauty' },
            { label: 'Sports & Recreation', value: 'sports-recreation' },
            { label: 'Services', value: 'services' },
          ],
          required: true,
        },
      ],
    },
  ],
})