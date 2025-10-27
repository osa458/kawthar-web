import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM merchants ORDER BY created_at DESC')
    return NextResponse.json({ merchants: result.rows })
  } catch (error) {
    console.error('Error fetching merchants:', error)
    return NextResponse.json({ error: 'Failed to fetch merchants' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, category, image_url, website, status = 'draft' } = await request.json()
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const result = await pool.query(
      'INSERT INTO merchants (name, description, category, image_url, website, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, category, image_url, website, status]
    )

    return NextResponse.json({ merchant: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating merchant:', error)
    return NextResponse.json({ error: 'Failed to create merchant' }, { status: 500 })
  }
}
