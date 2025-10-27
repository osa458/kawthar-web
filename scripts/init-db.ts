import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Initializing database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kawthar.app' },
    update: {},
    create: {
      email: 'admin@kawthar.app',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample events
  const sampleEvents = [
    {
      title: 'Ramadan Iftar Community Gathering',
      slug: 'ramadan-iftar-community',
      description: 'Join us for a beautiful community iftar dinner during the holy month of Ramadan. All are welcome to share in this blessed meal.',
      date: '2024-03-15',
      time: '18:30',
      location: 'Community Center Downtown',
      neighborhood: 'Downtown',
      category: 'Religious',
      image: '/images/events/ramadan-iftar.jpg',
      price: 0,
      organizer: 'Islamic Community Center',
      capacity: 200,
      attendees: 150,
      published: true
    },
    {
      title: 'Arabic Cooking Workshop',
      slug: 'arabic-cooking-workshop',
      description: 'Learn to cook traditional Arabic dishes with our expert chef. Perfect for beginners and food enthusiasts.',
      date: '2024-03-20',
      time: '14:00',
      location: 'Culinary Arts Center',
      neighborhood: 'Midtown',
      category: 'Educational',
      image: '/images/events/cooking-workshop.jpg',
      price: 45,
      organizer: 'Cultural Arts Society',
      capacity: 25,
      attendees: 20,
      published: true
    }
  ];

  for (const eventData of sampleEvents) {
    await prisma.event.upsert({
      where: { slug: eventData.slug },
      update: {},
      create: eventData
    });
  }

  console.log('✅ Sample events created');

  // Create sample merchants
  const sampleMerchants = [
    {
      name: 'Al-Noor Bakery',
      slug: 'al-noor-bakery',
      description: 'Traditional Middle Eastern bakery specializing in fresh bread, pastries, and sweets.',
      category: 'Food & Beverage',
      neighborhood: 'Little Arabia',
      image: '/images/merchants/al-noor-bakery.jpg',
      rating: 4.8,
      reviewCount: 127,
      hours: '6:00 AM - 10:00 PM',
      phone: '(555) 123-4567',
      website: 'https://alnoorbakery.com',
      featured: true,
      published: true
    },
    {
      name: 'Oriental Rug Gallery',
      slug: 'oriental-rug-gallery',
      description: 'Authentic Persian and Turkish rugs, carpets, and home decor items.',
      category: 'Home & Garden',
      neighborhood: 'Downtown',
      image: '/images/merchants/rug-gallery.jpg',
      rating: 4.6,
      reviewCount: 89,
      hours: '10:00 AM - 7:00 PM',
      phone: '(555) 234-5678',
      website: 'https://orientalrugs.com',
      featured: false,
      published: true
    }
  ];

  for (const merchantData of sampleMerchants) {
    await prisma.merchant.upsert({
      where: { slug: merchantData.slug },
      update: {},
      create: merchantData
    });
  }

  console.log('✅ Sample merchants created');

  // Create sample organization
  const sampleOrg = {
    name: 'Islamic Community Center',
    slug: 'islamic-community-center',
    description: 'Serving the Muslim community with religious services, educational programs, and social events.',
    image: '/images/orgs/islamic-center.jpg',
    website: 'https://islamiccenter.org',
    published: true
  };

  await prisma.organization.upsert({
    where: { slug: sampleOrg.slug },
    update: {},
    create: sampleOrg
  });

  console.log('✅ Sample organization created');
  console.log('🎉 Database initialization complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error initializing database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
