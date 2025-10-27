import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
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

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: slateEditor({}),
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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: true,
  }),
  serverURL: process.env.ADMIN_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
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