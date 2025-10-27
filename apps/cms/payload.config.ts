import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { slateEditor } from '@payloadcms/richtext-slate'

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
import { Media } from './collections/Media'

const bucket = process.env.S3_BUCKET || ''
const endpoint = process.env.S3_ENDPOINT || ''

export default buildConfig({
  serverURL: process.env.ADMIN_URL, // https://cms.kawthar.app
  admin: { 
    user: 'users' 
  },
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET!,
  db: postgresAdapter({ 
    pool: { 
      connectionString: process.env.DATABASE_URL! 
    } 
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket,
      config: {
        endpoint,
        region: 'us-east-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
  collections: [
    Media,
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
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://kawthar.app',
    'https://www.kawthar.app',
    'https://cms.kawthar.app',
  ],
  csrf: [
    'http://localhost:3000',
    'https://kawthar.app',
    'https://www.kawthar.app',
    'https://cms.kawthar.app',
  ],
})