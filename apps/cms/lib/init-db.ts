import pool from './db'

export async function initDatabase() {
  try {
    console.log('🔌 Attempting to connect to database...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
    
    // Test connection first
    const client = await pool.connect()
    console.log('✅ Database connection successful')
    client.release()

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        time TIME,
        location VARCHAR(255),
        image_url VARCHAR(500),
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create merchants table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS merchants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        image_url VARCHAR(500),
        website VARCHAR(500),
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create organizations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS organizations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        website VARCHAR(500),
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('✅ Database tables created successfully')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}
