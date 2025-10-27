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
    // Fallback to empty array if CMS is unavailable
    return [];
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
    return [];
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
    return [];
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
    return [];
  }
}

