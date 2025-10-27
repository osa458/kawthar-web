import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify the secret header
    const authHeader = request.headers.get('authorization')
    const expectedSecret = process.env.REVALIDATE_SECRET
    
    if (!authHeader || !expectedSecret) {
      return NextResponse.json({ error: 'Missing authorization' }, { status: 401 })
    }
    
    const token = authHeader.replace('Bearer ', '')
    if (token !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    const body = await request.json()
    const { type, id, path, tag } = body
    
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
    
    return NextResponse.json({ 
      revalidated: true, 
      type, 
      id,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
