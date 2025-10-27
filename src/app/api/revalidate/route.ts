import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const headerSecret = request.headers.get('x-revalidate-secret');
  
  // Verify secret
  if (!secret || headerSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path } = body;

    if (path) {
      revalidatePath(path, 'page');
      console.log(`✅ Revalidated path: ${path}`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      path,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
