import { buildConfig } from 'payload'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export default buildConfig({
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Kawthar CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: lexicalEditor({}),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'role',
          type: 'relationship',
          relationTo: 'roles',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'verified',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      timestamps: true,
    },
    {
      slug: 'roles',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Moderator', value: 'moderator' },
            { label: 'Organizer', value: 'organizer' },
            { label: 'Merchant', value: 'merchant' },
            { label: 'Reader', value: 'reader' },
          ],
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'permissions',
          type: 'array',
          fields: [
            {
              name: 'collection',
              type: 'text',
              required: true,
            },
            {
              name: 'actions',
              type: 'array',
              fields: [
                {
                  name: 'action',
                  type: 'select',
                  options: [
                    { label: 'Create', value: 'create' },
                    { label: 'Read', value: 'read' },
                    { label: 'Update', value: 'update' },
                    { label: 'Delete', value: 'delete' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      timestamps: true,
    },
    {
      slug: 'organizations',
      admin: {
        useAsTitle: 'name',
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
          type: 'array',
          fields: [
            {
              name: 'language',
              type: 'select',
              options: [
                { label: 'Arabic', value: 'arabic' },
                { label: 'English', value: 'english' },
                { label: 'French', value: 'french' },
                { label: 'Spanish', value: 'spanish' },
              ],
            },
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
          name: 'social',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
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
      timestamps: true,
    },
    {
      slug: 'events',
      admin: {
        useAsTitle: 'title',
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
          name: 'tz',
          type: 'text',
          defaultValue: 'America/New_York',
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Religious', value: 'religious' },
            { label: 'Educational', value: 'educational' },
            { label: 'Cultural', value: 'cultural' },
            { label: 'Social', value: 'social' },
            { label: 'Business', value: 'business' },
          ],
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
          name: 'recurrence',
          type: 'relationship',
          relationTo: 'recurrences',
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'externalRegistrationUrl',
          type: 'text',
        },
        {
          name: 'organization',
          type: 'relationship',
          relationTo: 'organizations',
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
      timestamps: true,
    },
    {
      slug: 'recurrences',
      admin: {
        useAsTitle: 'event',
      },
      fields: [
        {
          name: 'event',
          type: 'relationship',
          relationTo: 'events',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Seasonal', value: 'seasonal' },
          ],
          required: true,
        },
        {
          name: 'byDay',
          type: 'array',
          fields: [
            {
              name: 'day',
              type: 'select',
              options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' },
              ],
            },
          ],
        },
        {
          name: 'byWeekOfMonth',
          type: 'array',
          fields: [
            {
              name: 'week',
              type: 'select',
              options: [
                { label: 'First', value: 'first' },
                { label: 'Second', value: 'second' },
                { label: 'Third', value: 'third' },
                { label: 'Fourth', value: 'fourth' },
                { label: 'Last', value: 'last' },
              ],
            },
          ],
        },
        {
          name: 'season',
          type: 'select',
          options: [
            { label: 'Ramadan', value: 'ramadan' },
            { label: 'Eid', value: 'eid' },
            { label: 'None', value: null },
          ],
        },
      ],
      timestamps: true,
    },
    {
      slug: 'merchants',
      admin: {
        useAsTitle: 'name',
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
          name: 'categories',
          type: 'array',
          fields: [
            {
              name: 'category',
              type: 'select',
              options: [
                { label: 'Food & Beverage', value: 'food-beverage' },
                { label: 'Home & Garden', value: 'home-garden' },
                { label: 'Books & Media', value: 'books-media' },
                { label: 'Fashion', value: 'fashion' },
                { label: 'Art & Crafts', value: 'art-crafts' },
                { label: 'Health & Beauty', value: 'health-beauty' },
                { label: 'Electronics', value: 'electronics' },
                { label: 'Services', value: 'services' },
              ],
            },
          ],
        },
        {
          name: 'halalCert',
          type: 'upload',
          relationTo: 'media',
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
          name: 'deliveryOptions',
          type: 'array',
          fields: [
            {
              name: 'option',
              type: 'select',
              options: [
                { label: 'Pickup', value: 'pickup' },
                { label: 'Delivery', value: 'delivery' },
                { label: 'Shipping', value: 'shipping' },
              ],
            },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'website',
              type: 'text',
            },
          ],
        },
        {
          name: 'verified',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'cover',
          type: 'upload',
          relationTo: 'media',
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
      timestamps: true,
    },
    {
      slug: 'products',
      admin: {
        useAsTitle: 'title',
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'inventory',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
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
            { label: 'Out of Stock', value: 'out-of-stock' },
          ],
          defaultValue: 'draft',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'coupons',
      admin: {
        useAsTitle: 'code',
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
          name: 'usageLimit',
          type: 'number',
        },
        {
          name: 'merchant',
          type: 'relationship',
          relationTo: 'merchants',
        },
        {
          name: 'organization',
          type: 'relationship',
          relationTo: 'organizations',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Expired', value: 'expired' },
          ],
          defaultValue: 'draft',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'meetups',
      admin: {
        useAsTitle: 'title',
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
            { label: 'Educational', value: 'educational' },
            { label: 'Cultural', value: 'cultural' },
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
          name: 'firstMeetingZoom',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'organization',
          type: 'relationship',
          relationTo: 'organizations',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
          defaultValue: 'draft',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'verifications',
      admin: {
        useAsTitle: 'entityName',
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
          name: 'entityName',
          type: 'text',
          required: true,
        },
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'Attestation', value: 'attestation' },
            { label: 'Identity Verification', value: 'idv' },
            { label: 'Document Review', value: 'document' },
            { label: 'Site Visit', value: 'site-visit' },
          ],
          required: true,
        },
        {
          name: 'attesterOrg',
          type: 'text',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Verified', value: 'verified' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Expired', value: 'expired' },
          ],
          defaultValue: 'pending',
        },
        {
          name: 'evidenceUri',
          type: 'text',
        },
        {
          name: 'expiresAt',
          type: 'date',
        },
        {
          name: 'verifiedBy',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'notes',
          type: 'textarea',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'abusereports',
      admin: {
        useAsTitle: 'subjectType',
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
            { label: 'Content', value: 'content' },
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
            { label: 'Inappropriate Content', value: 'inappropriate-content' },
            { label: 'Spam', value: 'spam' },
            { label: 'Harassment', value: 'harassment' },
            { label: 'Fake Information', value: 'fake-info' },
            { label: 'Safety Concern', value: 'safety' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'reporterUser',
          type: 'relationship',
          relationTo: 'users',
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
        {
          name: 'assignedTo',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'resolution',
          type: 'textarea',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'media',
      upload: {
        staticDir: 'media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
            height: undefined,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
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
  onInit: async (payload) => {
    // Create default roles
    const roles = await payload.find({
      collection: 'roles',
      limit: 0,
    });

    if (roles.totalDocs === 0) {
      await payload.create({
        collection: 'roles',
        data: {
          name: 'admin',
          description: 'Full access to all collections',
          permissions: [
            {
              collection: 'users',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'organizations',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'events',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'merchants',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'products',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'coupons',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'meetups',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'verifications',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
            {
              collection: 'abusereports',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }, { action: 'delete' }],
            },
          ],
        },
      });

      await payload.create({
        collection: 'roles',
        data: {
          name: 'moderator',
          description: 'Review and moderate content',
          permissions: [
            {
              collection: 'organizations',
              actions: [{ action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'events',
              actions: [{ action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'merchants',
              actions: [{ action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'verifications',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'abusereports',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
          ],
        },
      });

      await payload.create({
        collection: 'roles',
        data: {
          name: 'organizer',
          description: 'Manage events and organizations',
          permissions: [
            {
              collection: 'organizations',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'events',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'meetups',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
          ],
        },
      });

      await payload.create({
        collection: 'roles',
        data: {
          name: 'merchant',
          description: 'Manage merchant profiles and products',
          permissions: [
            {
              collection: 'merchants',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'products',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
            {
              collection: 'coupons',
              actions: [{ action: 'create' }, { action: 'read' }, { action: 'update' }],
            },
          ],
        },
      });

      await payload.create({
        collection: 'roles',
        data: {
          name: 'reader',
          description: 'Read-only access to published content',
          permissions: [
            {
              collection: 'organizations',
              actions: [{ action: 'read' }],
            },
            {
              collection: 'events',
              actions: [{ action: 'read' }],
            },
            {
              collection: 'merchants',
              actions: [{ action: 'read' }],
            },
            {
              collection: 'products',
              actions: [{ action: 'read' }],
            },
            {
              collection: 'coupons',
              actions: [{ action: 'read' }],
            },
            {
              collection: 'meetups',
              actions: [{ action: 'read' }],
            },
          ],
        },
      });
    }
  },
})
