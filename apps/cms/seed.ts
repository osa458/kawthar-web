import { getPayload } from 'payload'
import config from './payload.config'

const payload = await getPayload({ config })

async function seed() {
  try {
    console.log('🌱 Starting seed process...')

    // Create admin user
    const adminRole = await payload.find({
      collection: 'roles',
      where: { name: { equals: 'admin' } },
      limit: 1,
    })

    if (adminRole.docs.length === 0) {
      console.log('❌ Admin role not found. Please run the CMS first to initialize roles.')
      process.exit(1)
    }

    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@kawthar.app' } },
      limit: 1,
    })

    let adminUser
    if (existingAdmin.docs.length === 0) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@kawthar.app',
          password: 'admin123',
          name: 'Admin User',
          role: adminRole.docs[0].id,
          verified: true,
        },
      })
      console.log('✅ Created admin user')
    } else {
      adminUser = existingAdmin.docs[0]
      console.log('ℹ️ Admin user already exists')
    }

    // Create sample organization
    const existingOrg = await payload.find({
      collection: 'organizations',
      where: { slug: { equals: 'islamic-community-center' } },
      limit: 1,
    })

    let organization
    if (existingOrg.docs.length === 0) {
      organization = await payload.create({
        collection: 'organizations',
        data: {
          name: 'Islamic Community Center',
          slug: 'islamic-community-center',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Serving the Muslim community with religious services, educational programs, and social events. We provide a welcoming space for worship, learning, and community building.',
                    },
                  ],
                },
              ],
            },
          },
          address: '123 Main Street, Downtown',
          neighborhood: 'Downtown',
          languages: [
            { language: 'arabic' },
            { language: 'english' },
          ],
          verified: true,
          contactEmail: 'info@islamiccenter.org',
          website: 'https://islamiccenter.org',
          social: [
            {
              platform: 'facebook',
              url: 'https://facebook.com/islamiccenter',
            },
            {
              platform: 'instagram',
              url: 'https://instagram.com/islamiccenter',
            },
          ],
          status: 'published',
        },
      })
      console.log('✅ Created sample organization')
    } else {
      organization = existingOrg.docs[0]
      console.log('ℹ️ Sample organization already exists')
    }

    // Create sample events
    const events = [
      {
        title: 'Ramadan Iftar Community Gathering',
        slug: 'ramadan-iftar-community',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Join us for a beautiful community iftar dinner during the holy month of Ramadan. All are welcome to share in this blessed meal and connect with fellow community members.',
                  },
                ],
              },
            ],
          },
        },
        start: '2024-03-15T18:30:00Z',
        end: '2024-03-15T20:30:00Z',
        tz: 'America/New_York',
        category: 'religious',
        womenOnly: false,
        parentFacing: true,
        venue: 'Community Center Downtown',
        cityArea: 'Downtown',
        organization: organization.id,
        status: 'published',
      },
      {
        title: 'Arabic Cooking Workshop',
        slug: 'arabic-cooking-workshop',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Learn to cook traditional Arabic dishes with our expert chef. Perfect for beginners and food enthusiasts. We will cover basic techniques and traditional recipes.',
                  },
                ],
              },
            ],
          },
        },
        start: '2024-03-20T14:00:00Z',
        end: '2024-03-20T17:00:00Z',
        tz: 'America/New_York',
        category: 'educational',
        womenOnly: false,
        parentFacing: false,
        venue: 'Culinary Arts Center',
        cityArea: 'Midtown',
        organization: organization.id,
        status: 'published',
      },
      {
        title: 'Arabic Poetry Night',
        slug: 'arabic-poetry-night',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'An evening of beautiful Arabic poetry readings and performances. Featuring local and visiting poets sharing their work in both Arabic and English.',
                  },
                ],
              },
            ],
          },
        },
        start: '2024-03-25T19:00:00Z',
        end: '2024-03-25T21:00:00Z',
        tz: 'America/New_York',
        category: 'cultural',
        womenOnly: false,
        parentFacing: true,
        venue: 'Poetry House',
        cityArea: 'Arts District',
        organization: organization.id,
        status: 'published',
      },
    ]

    for (const eventData of events) {
      const existingEvent = await payload.find({
        collection: 'events',
        where: { slug: { equals: eventData.slug } },
        limit: 1,
      })

      if (existingEvent.docs.length === 0) {
        await payload.create({
          collection: 'events',
          data: eventData,
        })
        console.log(`✅ Created event: ${eventData.title}`)
      } else {
        console.log(`ℹ️ Event already exists: ${eventData.title}`)
      }
    }

    // Create sample merchant
    const existingMerchant = await payload.find({
      collection: 'merchants',
      where: { slug: { equals: 'al-noor-bakery' } },
      limit: 1,
    })

    if (existingMerchant.docs.length === 0) {
      await payload.create({
        collection: 'merchants',
        data: {
          name: 'Al-Noor Bakery',
          slug: 'al-noor-bakery',
          categories: [
            { category: 'food-beverage' },
          ],
          address: '456 Bakery Street, Little Arabia',
          hours: '6:00 AM - 10:00 PM',
          deliveryOptions: [
            { option: 'pickup' },
            { option: 'delivery' },
          ],
          contact: {
            phone: '(555) 123-4567',
            email: 'info@alnoorbakery.com',
            website: 'https://alnoorbakery.com',
          },
          verified: true,
          status: 'published',
        },
      })
      console.log('✅ Created sample merchant')
    } else {
      console.log('ℹ️ Sample merchant already exists')
    }

    console.log('🎉 Seed process completed successfully!')
    console.log('')
    console.log('📋 Summary:')
    console.log('   • Admin user: admin@kawthar.app / admin123')
    console.log('   • Sample organization: Islamic Community Center')
    console.log('   • Sample events: 3 events created')
    console.log('   • Sample merchant: Al-Noor Bakery')
    console.log('')
    console.log('🌐 Access the admin panel at: http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Seed process failed:', error)
    process.exit(1)
  }
}

seed()
