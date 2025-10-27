import { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify the secret header
    const authHeader = req.headers.authorization
    const expectedSecret = process.env.REVALIDATE_SECRET
    
    if (!authHeader || !expectedSecret) {
      return res.status(401).json({ error: 'Missing authorization' })
    }
    
    const token = authHeader.replace('Bearer ', '')
    if (token !== expectedSecret) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    
    const { type, id, path, tag } = req.body
    
    // Revalidate based on type
    if (path) {
      revalidatePath(path)
    } else if (tag) {
      revalidateTag(tag)
    } else {
      // Default revalidation based on type
      switch (type) {
        case 'event':
          revalidatePath('/events')
          revalidatePath(`/events/${id}`)
          revalidateTag('events')
          break
        case 'organization':
          revalidatePath('/orgs')
          revalidatePath(`/orgs/${id}`)
          revalidateTag('organizations')
          break
        case 'merchant':
          revalidatePath('/market')
          revalidatePath(`/market/${id}`)
          revalidateTag('merchants')
          break
        case 'product':
          revalidatePath('/market')
          revalidateTag('products')
          break
        default:
          revalidatePath('/')
      }
    }
    
    res.json({ 
      revalidated: true, 
      type, 
      id,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Revalidation error:', error)
    res.status(500).json({ error: 'Revalidation failed' })
  }
}
