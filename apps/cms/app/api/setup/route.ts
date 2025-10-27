import { NextResponse } from 'next/server'
import { initDatabase } from '../../../lib/init-db'
import pool from '../../../lib/db'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Initialize database
    await initDatabase()
    console.log('✅ Database initialized')

    // Check if admin user already exists
    const existingAdmin = await pool.query(
      'SELECT id FROM users WHERE email = $1 AND role = $2',
      ['admin@kawthar.app', 'admin']
    )

    if (existingAdmin.rows.length > 0) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        user: existingAdmin.rows[0]
      })
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    const result = await pool.query(
      'INSERT INTO users (email, name, password, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at',
      ['admin@kawthar.app', 'Kawthar Admin', hashedPassword, 'admin']
    )

    console.log('✅ Admin user created')

    return NextResponse.json({ 
      message: 'Setup completed successfully',
      user: result.rows[0],
      credentials: {
        email: 'admin@kawthar.app',
        password: 'admin123'
      }
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ 
      error: 'Setup failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
