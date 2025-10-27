import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const merchants = await prisma.merchant.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(merchants);
  } catch (error) {
    console.error('Error fetching merchants:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      category,
      neighborhood,
      image,
      rating,
      reviewCount,
      hours,
      phone,
      website,
      featured = false,
      published = false
    } = body;

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const merchant = await prisma.merchant.create({
      data: {
        name,
        slug,
        description,
        category,
        neighborhood,
        image,
        rating: parseFloat(rating) || 0,
        reviewCount: parseInt(reviewCount) || 0,
        hours,
        phone,
        website,
        featured,
        published
      }
    });

    return NextResponse.json(merchant, { status: 201 });
  } catch (error) {
    console.error('Error creating merchant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
