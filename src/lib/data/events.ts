export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  category: string;
  image: string;
  price: number;
  organizer: string;
  capacity: number;
  attendees: number;
}

export interface Merchant {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  neighborhood: string;
  image: string;
  rating: number;
  reviewCount: number;
  hours: string;
  phone: string;
  website: string;
  featured: boolean;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  website: string;
  seasonal: Event[];
  recurring: Event[];
  special: Event[];
}

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

// Mock data
const mockEvents: Event[] = [
  {
    id: "1",
    slug: "ramadan-iftar-community",
    title: "Ramadan Iftar Community Gathering",
    description: "Join us for a beautiful community iftar dinner during the holy month of Ramadan. All are welcome to share in this blessed meal.",
    date: "2024-03-15",
    time: "18:30",
    location: "Community Center Downtown",
    neighborhood: "Downtown",
    category: "Religious",
    image: "/images/events/ramadan-iftar.jpg",
    price: 0,
    organizer: "Islamic Community Center",
    capacity: 200,
    attendees: 150
  },
  {
    id: "2",
    slug: "arabic-cooking-workshop",
    title: "Arabic Cooking Workshop",
    description: "Learn to cook traditional Arabic dishes with our expert chef. Perfect for beginners and food enthusiasts.",
    date: "2024-03-20",
    time: "14:00",
    location: "Culinary Arts Center",
    neighborhood: "Midtown",
    category: "Educational",
    image: "/images/events/cooking-workshop.jpg",
    price: 45,
    organizer: "Cultural Arts Society",
    capacity: 25,
    attendees: 20
  },
  {
    id: "3",
    slug: "arabic-poetry-night",
    title: "Arabic Poetry Night",
    description: "An evening of beautiful Arabic poetry readings and performances. Featuring local and visiting poets.",
    date: "2024-03-25",
    time: "19:00",
    location: "Poetry House",
    neighborhood: "Arts District",
    category: "Cultural",
    image: "/images/events/poetry-night.jpg",
    price: 15,
    organizer: "Poetry Society",
    capacity: 80,
    attendees: 65
  }
];

const mockMerchants: Merchant[] = [
  {
    id: "1",
    slug: "al-noor-bakery",
    name: "Al-Noor Bakery",
    description: "Traditional Middle Eastern bakery specializing in fresh bread, pastries, and sweets.",
    category: "Food & Beverage",
    neighborhood: "Little Arabia",
    image: "/images/merchants/al-noor-bakery.jpg",
    rating: 4.8,
    reviewCount: 127,
    hours: "6:00 AM - 10:00 PM",
    phone: "(555) 123-4567",
    website: "https://alnoorbakery.com",
    featured: true
  },
  {
    id: "2",
    slug: "oriental-rug-gallery",
    name: "Oriental Rug Gallery",
    description: "Authentic Persian and Turkish rugs, carpets, and home decor items.",
    category: "Home & Garden",
    neighborhood: "Downtown",
    image: "/images/merchants/rug-gallery.jpg",
    rating: 4.6,
    reviewCount: 89,
    hours: "10:00 AM - 7:00 PM",
    phone: "(555) 234-5678",
    website: "https://orientalrugs.com",
    featured: false
  },
  {
    id: "3",
    slug: "arabic-bookstore",
    name: "Arabic Bookstore",
    description: "Books, literature, and educational materials in Arabic and English.",
    category: "Books & Media",
    neighborhood: "University District",
    image: "/images/merchants/bookstore.jpg",
    rating: 4.7,
    reviewCount: 156,
    hours: "9:00 AM - 9:00 PM",
    phone: "(555) 345-6789",
    website: "https://arabicbooks.com",
    featured: true
  }
];

const mockOrganizations: Organization[] = [
  {
    id: "1",
    slug: "islamic-community-center",
    name: "Islamic Community Center",
    description: "Serving the Muslim community with religious services, educational programs, and social events.",
    image: "/images/orgs/islamic-center.jpg",
    website: "https://islamiccenter.org",
    seasonal: [mockEvents[0]],
    recurring: [],
    special: []
  }
];

// Data loader functions
export async function getEvents(filters?: SearchFilters): Promise<Event[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filteredEvents = [...mockEvents];
  
  if (filters?.neighborhood) {
    filteredEvents = filteredEvents.filter(event => 
      event.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
    );
  }
  
  if (filters?.category) {
    filteredEvents = filteredEvents.filter(event => 
      event.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }
  
  if (filters?.dateRange) {
    filteredEvents = filteredEvents.filter(event => 
      event.date >= filters.dateRange!.start && event.date <= filters.dateRange!.end
    );
  }
  
  return filteredEvents;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockEvents.find(event => event.slug === slug) || null;
}

export async function getMerchants(filters?: { category?: string; neighborhood?: string }): Promise<Merchant[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filteredMerchants = [...mockMerchants];
  
  if (filters?.neighborhood) {
    filteredMerchants = filteredMerchants.filter(merchant => 
      merchant.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
    );
  }
  
  if (filters?.category) {
    filteredMerchants = filteredMerchants.filter(merchant => 
      merchant.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }
  
  return filteredMerchants;
}

export async function getMerchantBySlug(slug: string): Promise<Merchant | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockMerchants.find(merchant => merchant.slug === slug) || null;
}

export async function getOrganizations(): Promise<Organization[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockOrganizations;
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockOrganizations.find(org => org.slug === slug) || null;
}

export async function searchEvents(query: string, filters?: SearchFilters): Promise<Event[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let results = mockEvents.filter(event => 
    event.title.toLowerCase().includes(query.toLowerCase()) ||
    event.description.toLowerCase().includes(query.toLowerCase()) ||
    event.location.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filters?.neighborhood) {
    results = results.filter(event => 
      event.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
    );
  }
  
  if (filters?.category) {
    results = results.filter(event => 
      event.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }
  
  return results;
}

