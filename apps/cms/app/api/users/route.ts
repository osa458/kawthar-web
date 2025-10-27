import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM users ORDER BY created_at DESC')
    client.release()
    
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, role } = await request.json()
    
    const client = await pool.connect()
    const result = await client.query(
      'INSERT INTO users (email, name, role) VALUES ($1, $2, $3) RETURNING *',
      [email, name, role || 'user']
    )
    client.release()
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}