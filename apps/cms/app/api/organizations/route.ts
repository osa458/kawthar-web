import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'

// Helper function to create slug from name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper function to format organization for Payload CMS API
function formatOrganizationForPayload(organization: any) {
  return {
    id: organization.id.toString(),
    name: organization.name,
    slug: organization.slug || createSlug(organization.name),
    description: organization.description || '',
    image: organization.image_url ? {
      url: organization.image_url,
      alt: organization.name
    } : undefined,
    website: organization.website || '',
    published: organization.status === 'published',
    createdAt: organization.created_at,
    updatedAt: organization.updated_at
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
    const countResult = await pool.query(`SELECT COUNT(*) FROM organizations ${whereClause}`, queryParams)
    const totalDocs = parseInt(countResult.rows[0].count)

    // Get organizations with pagination
    const offset = (page - 1) * limit
    paramCount++
    whereClause += ` LIMIT $${paramCount}`
    queryParams.push(limit)
    
    paramCount++
    whereClause += ` OFFSET $${paramCount}`
    queryParams.push(offset)

    const result = await pool.query(
      `SELECT * FROM organizations ${whereClause} ${orderClause}`,
      queryParams
    )

    const docs = result.rows.map(formatOrganizationForPayload)
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
    console.error('Error fetching organizations:', error)
    return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, image_url, website, status = 'draft' } = await request.json()
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const slug = createSlug(name)
    const result = await pool.query(
      'INSERT INTO organizations (name, slug, description, image_url, website, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, slug, description, image_url, website, status]
    )

    return NextResponse.json({ organization: formatOrganizationForPayload(result.rows[0]) }, { status: 201 })
  } catch (error) {
    console.error('Error creating organization:', error)
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 })
  }
}
