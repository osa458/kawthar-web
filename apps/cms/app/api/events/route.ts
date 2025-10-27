import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper function to format event for Payload CMS API
function formatEventForPayload(event: any) {
  return {
    id: event.id.toString(),
    title: event.title,
    slug: event.slug || createSlug(event.title),
    description: event.description || '',
    date: event.date || new Date().toISOString().split('T')[0],
    time: event.time || '19:00',
    location: event.location || '',
    neighborhood: event.neighborhood || 'Downtown',
    category: event.category || 'Cultural',
    image: event.image_url ? {
      url: event.image_url,
      alt: event.title
    } : undefined,
    price: event.price || 0,
    organizer: event.organizer || 'Kawthar Community',
    capacity: event.capacity || 50,
    attendees: event.attendees || 0,
    published: event.status === 'published',
    createdAt: event.created_at,
    updatedAt: event.updated_at
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const where = searchParams.get('where')
    const sort = searchParams.get('sort') || '-created_at'
    
    let whereClause = 'WHERE 1=1'
    let queryParams: any[] = []
    let paramCount = 0

    // Parse where conditions
    if (where) {
      try {
        const whereObj = JSON.parse(where)
        
        if (whereObj.published?.equals !== undefined) {
          paramCount++
          whereClause += ` AND status = $${paramCount}`
          queryParams.push(whereObj.published.equals ? 'published' : 'draft')
        }
        
        if (whereObj.neighborhood?.equals) {
          paramCount++
          whereClause += ` AND neighborhood = $${paramCount}`
          queryParams.push(whereObj.neighborhood.equals)
        }
        
        if (whereObj.category?.equals) {
          paramCount++
          whereClause += ` AND category = $${paramCount}`
          queryParams.push(whereObj.category.equals)
        }
        
        if (whereObj.slug?.equals) {
          paramCount++
          whereClause += ` AND slug = $${paramCount}`
          queryParams.push(whereObj.slug.equals)
        }
      } catch (e) {
        console.error('Error parsing where clause:', e)
      }
    }

    // Parse sort
    let orderClause = 'ORDER BY created_at DESC'
    if (sort) {
      if (sort.startsWith('-')) {
        orderClause = `ORDER BY ${sort.substring(1)} DESC`
      } else {
        orderClause = `ORDER BY ${sort} ASC`
      }
    }

    // Get total count
    const countResult = await pool.query(`SELECT COUNT(*) FROM events ${whereClause}`, queryParams)
    const totalDocs = parseInt(countResult.rows[0].count)

    // Get events with pagination
    const offset = (page - 1) * limit
    paramCount++
    whereClause += ` LIMIT $${paramCount}`
    queryParams.push(limit)
    
    paramCount++
    whereClause += ` OFFSET $${paramCount}`
    queryParams.push(offset)

    const result = await pool.query(
      `SELECT * FROM events ${whereClause} ${orderClause}`,
      queryParams
    )

    const docs = result.rows.map(formatEventForPayload)
    const totalPages = Math.ceil(totalDocs / limit)

    return NextResponse.json({
      docs,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: offset + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, date, time, location, neighborhood, category, price, organizer, capacity, image_url, status = 'draft' } = await request.json()
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slug = createSlug(title)
    const result = await pool.query(
      'INSERT INTO events (title, description, date, time, location, neighborhood, category, price, organizer, capacity, image_url, status, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [title, description, date, time, location, neighborhood, category, price, organizer, capacity, image_url, status, slug]
    )

    return NextResponse.json({ event: formatEventForPayload(result.rows[0]) }, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
