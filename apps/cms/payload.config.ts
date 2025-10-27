import { buildConfig } from 'payload'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Organizations } from './collections/Organizations'
import { Events } from './collections/Events'
import { Merchants } from './collections/Merchants'
import { Products } from './collections/Products'
import { Meetups } from './collections/Meetups'
import { Coupons } from './collections/Coupons'
import { Verifications } from './collections/Verifications'
import { AbuseReports } from './collections/AbuseReports'
import { Roles } from './collections/Roles'
import { Recurrences } from './collections/Recurrences'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Organizations,
    Events,
    Merchants,
    Products,
    Meetups,
    Coupons,
    Verifications,
    AbuseReports,
    Roles,
    Recurrences,
  ],
  plugins: [
    s3Storage({
      collections: {
        'users': true,
        'organizations': true,
        'events': true,
        'merchants': true,
        'products': true,
        'meetups': true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT,
        region: 'nyc3',
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: true,
  }),
  serverURL: process.env.ADMIN_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
})