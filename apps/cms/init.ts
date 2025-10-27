#!/usr/bin/env node

import { getPayload } from 'payload'
import config from './payload.config'

async function init() {
  console.log('🚀 Initializing Payload CMS...')
  
  try {
    const payload = await getPayload({ config })
    console.log('✅ Payload CMS initialized successfully')
    
    // Check if we have any users
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })
    
    if (users.docs.length === 0) {
      console.log('📝 No users found. You can create the first admin user at /admin')
    } else {
      console.log(`👤 Found ${users.docs.length} user(s)`)
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Failed to initialize Payload CMS:', error)
    process.exit(1)
  }
}

init()
