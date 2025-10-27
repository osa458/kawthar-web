import { cms, type Event, type Merchant, type Organization } from '@/lib/cms';

export interface SearchFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  neighborhood?: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

// Re-export types from CMS
export type { Event, Merchant, Organization };

// Sample data for when CMS is unavailable
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Ramadan Iftar Gathering',
    slug: 'ramadan-iftar-gathering',
    description: 'Join us for a beautiful iftar gathering with traditional Arabic food and community bonding.',
    date: '2024-03-15',
    time: '18:30',
    location: 'Community Center Downtown',
    neighborhood: 'Downtown',
    category: 'Religious',
    image: {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      alt: 'Ramadan Iftar Gathering'
    },
    price: 25,
    organizer: 'Kawthar Community',
    capacity: 100,
    attendees: 45,
    published: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Arabic Calligraphy Workshop',
    slug: 'arabic-calligraphy-workshop',
    description: 'Learn the beautiful art of Arabic calligraphy with master calligrapher Ahmed Hassan.',
    date: '2024-03-20',
    time: '14:00',
    location: 'Arts District Cultural Center',
    neighborhood: 'Arts District',
    category: 'Educational',
    image: {
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      alt: 'Arabic Calligraphy Workshop'
    },
    price: 50,
    organizer: 'Arabic Arts Society',
    capacity: 20,
    attendees: 12,
    published: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    title: 'Middle Eastern Food Festival',
    slug: 'middle-eastern-food-festival',
    description: 'Experience the rich flavors of Middle Eastern cuisine with local vendors and live cooking demonstrations.',
    date: '2024-03-25',
    time: '11:00',
    location: 'University District Plaza',
    neighborhood: 'University District',
    category: 'Cultural',
    image: {
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      alt: 'Middle Eastern Food Festival'
    },
    price: 0,
    organizer: 'Cultural Exchange Society',
    capacity: 200,
    attendees: 150,
    published: true,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  }
];

const sampleMerchants: Merchant[] = [
  {
    id: '1',
    name: 'Al-Noor Bakery',
    slug: 'al-noor-bakery',
    description: 'Authentic Middle Eastern pastries and breads made fresh daily.',
    category: 'Food & Beverage',
    neighborhood: 'Little Arabia',
    image: {
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      alt: 'Al-Noor Bakery'
    },
    rating: 4.8,
    reviewCount: 127,
    hours: 'Mon-Sun 6AM-10PM',
    phone: '(555) 123-4567',
    website: 'https://alnoorbakery.com',
    featured: true,
    published: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Orient Textiles',
    slug: 'orient-textiles',
    description: 'Beautiful fabrics, rugs, and traditional clothing from across the Middle East.',
    category: 'Fashion & Textiles',
    neighborhood: 'Downtown',
    image: {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      alt: 'Orient Textiles'
    },
    rating: 4.6,
    reviewCount: 89,
    hours: 'Mon-Sat 10AM-8PM',
    phone: '(555) 234-5678',
    website: 'https://orienttextiles.com',
    featured: false,
    published: true,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  }
];

const sampleOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Kawthar Community Center',
    slug: 'kawthar-community-center',
    description: 'A welcoming space for the Arabic community to gather, learn, and celebrate together.',
    image: {
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop',
      alt: 'Kawthar Community Center'
    },
    website: 'https://kawthar.app',
    published: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];

function getSampleEvents(filters?: SearchFilters): Event[] {
  let events = [...sampleEvents];
  
  if (filters?.neighborhood) {
    events = events.filter(event => event.neighborhood === filters.neighborhood);
  }
  
  if (filters?.category) {
    events = events.filter(event => event.category === filters.category);
  }
  
  if (filters?.priceRange) {
    events = events.filter(event => 
      event.price >= filters.priceRange!.min && 
      event.price <= filters.priceRange!.max
    );
  }
  
  return events;
}

function getSampleMerchants(filters?: { category?: string; neighborhood?: string }): Merchant[] {
  let merchants = [...sampleMerchants];
  
  if (filters?.neighborhood) {
    merchants = merchants.filter(merchant => merchant.neighborhood === filters.neighborhood);
  }
  
  if (filters?.category) {
    merchants = merchants.filter(merchant => merchant.category === filters.category);
  }
  
  return merchants;
}

function getSampleOrganizations(): Organization[] {
  return [...sampleOrganizations];
}

// Data loader functions using CMS API
export async function getEvents(filters?: SearchFilters): Promise<Event[]> {
  const where: any = {
    published: { equals: true }
  };
  
  if (filters?.neighborhood) {
    where.neighborhood = { equals: filters.neighborhood };
  }
  
  if (filters?.category) {
    where.category = { equals: filters.category };
  }
  
  if (filters?.dateRange) {
    where.date = {
      greater_than_equal: filters.dateRange.start,
      less_than_equal: filters.dateRange.end
    };
  }

  try {
    const response = await cms.getEvents({ where, sort: 'date' });
    return response.docs;
  } catch (error) {
    console.error('Error fetching events from CMS:', error);
    // Fallback to sample data if CMS is unavailable
    return getSampleEvents(filters);
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    return await cms.getEventBySlug(slug);
  } catch (error) {
    console.error(`Error fetching event with slug "${slug}":`, error);
    return null;
  }
}

export async function getMerchants(filters?: { category?: string; neighborhood?: string }): Promise<Merchant[]> {
  const where: any = {
    published: { equals: true }
  };
  
  if (filters?.neighborhood) {
    where.neighborhood = { equals: filters.neighborhood };
  }
  
  if (filters?.category) {
    where.category = { equals: filters.category };
  }

  try {
    const response = await cms.getMerchants({ where, sort: '-createdAt' });
    return response.docs;
  } catch (error) {
    console.error('Error fetching merchants from CMS:', error);
    return getSampleMerchants(filters);
  }
}

export async function getMerchantBySlug(slug: string): Promise<Merchant | null> {
  try {
    return await cms.getMerchantBySlug(slug);
  } catch (error) {
    console.error(`Error fetching merchant with slug "${slug}":`, error);
    return null;
  }
}

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const response = await cms.getOrganizations({ 
      where: { published: { equals: true } },
      sort: '-createdAt'
    });
    return response.docs;
  } catch (error) {
    console.error('Error fetching organizations from CMS:', error);
    return getSampleOrganizations();
  }
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  try {
    return await cms.getOrganizationBySlug(slug);
  } catch (error) {
    console.error(`Error fetching organization with slug "${slug}":`, error);
    return null;
  }
}

export async function searchEvents(query: string, filters?: SearchFilters): Promise<Event[]> {
  try {
    const response = await cms.searchEvents(query, filters);
    return response.docs;
  } catch (error) {
    console.error('Error searching events:', error);
    // Fallback to sample data with search
    const sampleEvents = getSampleEvents(filters);
    return sampleEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
  }
}

