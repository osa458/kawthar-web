// Frontend SDK for consuming Kawthar CMS API
const CMS_BASE_URL = process.env.CMS_BASE_URL || 'https://sea-lion-app-5wqrx.ondigitalocean.app'
const CMS_API_KEY = process.env.CMS_API_TOKEN

interface CMSResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

interface Event {
  id: string
  title: string
  slug: string
  description: any // Rich text content
  date: string
  time: string
  location: string
  neighborhood: string
  category: string
  image?: {
    url: string
    alt?: string
  }
  price: number
  organizer: string
  capacity: number
  attendees: number
  organization?: {
    id: string
    name: string
    slug: string
  }
  published: boolean
  createdAt: string
  updatedAt: string
}

interface Merchant {
  id: string
  name: string
  slug: string
  description: string
  category: string
  neighborhood: string
  image?: {
    url: string
    alt?: string
  }
  rating: number
  reviewCount: number
  hours: string
  phone: string
  website?: string
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

interface Organization {
  id: string
  name: string
  slug: string
  description: string
  image?: {
    url: string
    alt?: string
  }
  website?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

class KawtharCMS {
  private baseURL: string
  private apiKey: string

  constructor(baseURL: string = CMS_BASE_URL, apiKey: string = CMS_API_KEY || '') {
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}/api/${endpoint}`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.apiKey) {
      (headers as any)['Authorization'] = `Bearer ${this.apiKey}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`CMS API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Events API
  async getEvents(params: {
    page?: number
    limit?: number
    where?: any
    sort?: string
  } = {}): Promise<CMSResponse<Event>> {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.where) searchParams.set('where', JSON.stringify(params.where))
    if (params.sort) searchParams.set('sort', params.sort)

    const query = searchParams.toString()
    return this.request<CMSResponse<Event>>(`events${query ? `?${query}` : ''}`)
  }

  async getEventBySlug(slug: string): Promise<Event> {
    const response = await this.getEvents({
      where: { slug: { equals: slug } },
      limit: 1
    })
    
    if (response.docs.length === 0) {
      throw new Error(`Event with slug "${slug}" not found`)
    }
    
    return response.docs[0]
  }

  async searchEvents(query: string, filters?: {
    neighborhood?: string
    category?: string
    dateRange?: { start: string; end: string }
  }): Promise<CMSResponse<Event>> {
    const where: any = {
      published: { equals: true },
      $or: [
        { title: { contains: query } },
        { description: { contains: query } },
        { location: { contains: query } }
      ]
    }

    if (filters?.neighborhood) {
      where.neighborhood = { equals: filters.neighborhood }
    }

    if (filters?.category) {
      where.category = { equals: filters.category }
    }

    if (filters?.dateRange) {
      where.date = {
        greater_than_equal: filters.dateRange.start,
        less_than_equal: filters.dateRange.end
      }
    }

    return this.getEvents({ where })
  }

  // Merchants API
  async getMerchants(params: {
    page?: number
    limit?: number
    where?: any
    sort?: string
  } = {}): Promise<CMSResponse<Merchant>> {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.where) searchParams.set('where', JSON.stringify(params.where))
    if (params.sort) searchParams.set('sort', params.sort)

    const query = searchParams.toString()
    return this.request<CMSResponse<Merchant>>(`merchants${query ? `?${query}` : ''}`)
  }

  async getMerchantBySlug(slug: string): Promise<Merchant> {
    const response = await this.getMerchants({
      where: { slug: { equals: slug } },
      limit: 1
    })
    
    if (response.docs.length === 0) {
      throw new Error(`Merchant with slug "${slug}" not found`)
    }
    
    return response.docs[0]
  }

  // Organizations API
  async getOrganizations(params: {
    page?: number
    limit?: number
    where?: any
    sort?: string
  } = {}): Promise<CMSResponse<Organization>> {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    if (params.where) searchParams.set('where', JSON.stringify(params.where))
    if (params.sort) searchParams.set('sort', params.sort)

    const query = searchParams.toString()
    return this.request<CMSResponse<Organization>>(`organizations${query ? `?${query}` : ''}`)
  }

  async getOrganizationBySlug(slug: string): Promise<Organization> {
    const response = await this.getOrganizations({
      where: { slug: { equals: slug } },
      limit: 1
    })
    
    if (response.docs.length === 0) {
      throw new Error(`Organization with slug "${slug}" not found`)
    }
    
    return response.docs[0]
  }
}

// Export singleton instance
export const cms = new KawtharCMS()
export default KawtharCMS

// Export types
export type { Event, Merchant, Organization, CMSResponse }
