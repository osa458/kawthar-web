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
        {
          name: 'languages',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Arabic', value: 'arabic' },
            { label: 'English', value: 'english' },
            { label: 'French', value: 'french' },
          ],
        },
        {
          name: 'verified',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'contactEmail',
          type: 'email',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
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
        delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
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
          name: 'start',
          type: 'date',
          required: true,
        },
        {
          name: 'end',
          type: 'date',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Religious', value: 'religious' },
            { label: 'Educational', value: 'educational' },
            { label: 'Cultural', value: 'cultural' },
            { label: 'Social', value: 'social' },
          ],
          required: true,
        },
        {
          name: 'venue',
          type: 'text',
          required: true,
        },
        {
          name: 'cityArea',
          type: 'text',
          required: true,
        },
        {
          name: 'organization',
          type: 'relationship',
          relationTo: 'organizations',
          required: true,
        },
        {
          name: 'womenOnly',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'parentFacing',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
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
          type: 'textarea',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Food & Beverage', value: 'food-beverage' },
            { label: 'Home & Garden', value: 'home-garden' },
            { label: 'Books & Media', value: 'books-media' },
          ],
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
        },
        {
          name: 'verified',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        },
      ],
    },
    // Products
    {
      slug: 'products',
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'merchant',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'sku',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'inventory',
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
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        },
      ],
    },
    // Coupons
    {
      slug: 'coupons',
      admin: {
        useAsTitle: 'code',
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
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
          type: 'text',
          required: true,
        },
        {
          name: 'discountType',
          type: 'select',
          options: [
            { label: 'Percentage', value: 'percentage' },
            { label: 'Fixed Amount', value: 'fixed' },
          ],
          required: true,
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
        {
          name: 'start',
          type: 'date',
          required: true,
        },
        {
          name: 'end',
          type: 'date',
          required: true,
        },
        {
          name: 'merchant',
          type: 'relationship',
          relationTo: 'merchants',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Expired', value: 'expired' },
          ],
          defaultValue: 'active',
        },
      ],
    },
    // Meetups
    {
      slug: 'meetups',
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
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Networking', value: 'networking' },
            { label: 'Professional', value: 'professional' },
            { label: 'Social', value: 'social' },
          ],
          required: true,
        },
        {
          name: 'capacity',
          type: 'number',
          defaultValue: 20,
        },
        {
          name: 'womenOnly',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        },
      ],
    },
    // Verifications
    {
      slug: 'verifications',
      admin: {
        useAsTitle: 'entityName',
      },
      access: {
        read: ({ req: { user } }) => Boolean(user),
        create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
        update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
        delete: ({ req: { user } }) => user?.role === 'admin',
      },
      fields: [
        {
          name: 'subjectType',
          type: 'select',
          options: [
            { label: 'Organization', value: 'organization' },
            { label: 'Merchant', value: 'merchant' },
            { label: 'Event', value: 'event' },
          ],
          required: true,
        },
        {
          name: 'subjectId',
          type: 'text',
          required: true,
        },
        {
          name: 'entityName',
          type: 'text',
          required: true,
        },
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'Attestation', value: 'attestation' },
            { label: 'ID Verification', value: 'idv' },
          ],
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Verified', value: 'verified' },
            { label: 'Rejected', value: 'rejected' },
          ],
          defaultValue: 'pending',
        },
        {
          name: 'notes',
          type: 'textarea',
        },
      ],
    },
    // Abuse Reports
    {
      slug: 'abusereports',
      admin: {
        useAsTitle: 'subjectType',
      },
      access: {
        read: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
        create: () => true,
        update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
        delete: ({ req: { user } }) => user?.role === 'admin',
      },
      fields: [
        {
          name: 'subjectType',
          type: 'select',
          options: [
            { label: 'Organization', value: 'organization' },
            { label: 'Merchant', value: 'merchant' },
            { label: 'Event', value: 'event' },
            { label: 'User', value: 'user' },
          ],
          required: true,
        },
        {
          name: 'subjectId',
          type: 'text',
          required: true,
        },
        {
          name: 'reason',
          type: 'select',
          options: [
            { label: 'Inappropriate Content', value: 'inappropriate' },
            { label: 'Spam', value: 'spam' },
            { label: 'Harassment', value: 'harassment' },
            { label: 'Fake Info', value: 'fake-info' },
            { label: 'Safety Concern', value: 'safety' },
          ],
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Under Review', value: 'under-review' },
            { label: 'Resolved', value: 'resolved' },
            { label: 'Dismissed', value: 'dismissed' },
          ],
          defaultValue: 'open',
        },
      ],
    },
  ],
})
