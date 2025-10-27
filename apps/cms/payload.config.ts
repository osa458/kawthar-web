import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { s3Adapter } from '@payloadcms/plugin-s3'

import { Organizations } from './collections/Organizations'
import { Events } from './collections/Events'
import { Recurrences } from './collections/Recurrences'
import { Merchants } from './collections/Merchants'
import { Products } from './collections/Products'
import { Coupons } from './collections/Coupons'
import { Meetups } from './collections/Meetups'
import { Verifications } from './collections/Verifications'
import { AbuseReports } from './collections/AbuseReports'
import { Users } from './collections/Users'
import { Roles } from './collections/Roles'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Kawthar CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [
    Organizations,
    Events,
    Recurrences,
    Merchants,
    Products,
    Coupons,
    Meetups,
    Verifications,
    AbuseReports,
    Users,
    Roles,
  ],
  typescript: {
    outputFile: './payload-types.ts',
  },
  graphQL: {
    schemaOutputFile: './generated-schema.graphql',
  },
  plugins: [
    s3Adapter({
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: 'nyc3',
      },
      bucket: process.env.S3_BUCKET || '',
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: true,
  }),
  cors: [
    'https://kawthar.app',
    'https://cms.kawthar.app',
  ],
  csrf: [
    'https://kawthar.app',
    'https://cms.kawthar.app',
  ],
  serverURL: process.env.ADMIN_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
})
