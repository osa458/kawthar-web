import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  try {
    console.log('🌱 Starting seed...')

    const payload = await getPayload({ config })

    // Create admin user
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@kawthar.app',
        password: 'admin123!',
        name: 'Kawthar Admin',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created:', adminUser.email)

    // Create sample organization
    const organization = await payload.create({
      collection: 'organizations',
      data: {
        name: 'Kawthar Community Center',
        slug: 'kawthar-community-center',
        description: 'A welcoming space for the Arabic community to connect, learn, and grow together.',
        address: '123 Community Street, New York, NY 10001',
        neighborhood: 'Manhattan',
        languages: ['Arabic', 'English'],
        verified: true,
        contactEmail: 'info@kawthar-cc.org',
        website: 'https://kawthar-cc.org',
        social: [
          { platform: 'facebook', url: 'https://facebook.com/kawthar-cc' },
          { platform: 'instagram', url: 'https://instagram.com/kawthar-cc' }
        ],
      },
    })
    console.log('✅ Organization created:', organization.name)

    // Create sample events
    const events = [
      {
        title: 'Arabic Language Exchange',
        description: 'Practice Arabic conversation with native speakers in a friendly, supportive environment.',
        organization: organization.id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
        time: '7:00 PM',
        location: 'Kawthar Community Center',
        address: '123 Community Street, New York, NY 10001',
        category: 'educational',
        maxAttendees: 20,
        price: 0,
        status: 'published',
      },
      {
        title: 'Ramadan Iftar Gathering',
        description: 'Join us for a community iftar dinner during the holy month of Ramadan.',
        organization: organization.id,
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // In 2 weeks
        time: '6:30 PM',
        location: 'Kawthar Community Center',
        address: '123 Community Street, New York, NY 10001',
        category: 'cultural',
        maxAttendees: 50,
        price: 15,
        status: 'published',
      },
      {
        title: 'Women\'s Empowerment Workshop',
        description: 'A safe space for women to discuss career development, entrepreneurship, and personal growth.',
        organization: organization.id,
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // In 3 weeks
        time: '2:00 PM',
        location: 'Kawthar Community Center',
        address: '123 Community Street, New York, NY 10001',
        category: 'community',
        maxAttendees: 15,
        price: 0,
        status: 'published',
      },
    ]

    for (const eventData of events) {
      const event = await payload.create({
        collection: 'events',
        data: eventData,
      })
      console.log('✅ Event created:', event.title)
    }

    console.log('🎉 Seed completed successfully!')
    console.log('📧 Admin login: admin@kawthar.app')
    console.log('🔑 Admin password: admin123!')

  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()