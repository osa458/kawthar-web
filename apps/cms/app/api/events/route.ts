import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC')
    return NextResponse.json({ events: result.rows })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, date, time, location, image_url, status = 'draft' } = await request.json()
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const result = await pool.query(
      'INSERT INTO events (title, description, date, time, location, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, date, time, location, image_url, status]
    )

    return NextResponse.json({ event: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
