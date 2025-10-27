import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const headerSecret = request.headers.get('x-revalidate-secret');
  
  // Verify secret
  if (!secret || headerSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, tag } = body;

    if (path) {
      revalidatePath(path);
      console.log(`✅ Revalidated path: ${path}`);
    }

    if (tag) {
      revalidateTag(tag);
      console.log(`✅ Revalidated tag: ${tag}`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      path, 
      tag,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
