import { getPayload } from 'payload'
import config from './payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  // Create admin user
  const adminUser = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@kawthar.app',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create sample organization
  const organization = await payload.create({
    collection: 'organizations',
    data: {
      name: 'Kawthar Events',
      description: 'A sample organization for Kawthar events',
      website: 'https://kawthar.app',
      status: 'published',
    },
  })

  // Create sample events
  const events = await Promise.all([
    payload.create({
      collection: 'events',
      data: {
        title: 'Sample Event 1',
        description: 'This is a sample event',
        date: new Date('2024-01-01'),
        time: '18:00',
        location: 'Sample Location',
        organization: organization.id,
        status: 'published',
      },
    }),
    payload.create({
      collection: 'events',
      data: {
        title: 'Sample Event 2',
        description: 'This is another sample event',
        date: new Date('2024-01-02'),
        time: '19:00',
        location: 'Another Location',
        organization: organization.id,
        status: 'published',
      },
    }),
    payload.create({
      collection: 'events',
      data: {
        title: 'Sample Event 3',
        description: 'This is a third sample event',
        date: new Date('2024-01-03'),
        time: '20:00',
        location: 'Third Location',
        organization: organization.id,
        status: 'published',
      },
    }),
  ])

  console.log('Seed data created successfully!')
  console.log('Admin user:', adminUser.email)
  console.log('Organization:', organization.name)
  console.log('Events created:', events.length)
}

seed().catch(console.error)
