import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const neighborhood = searchParams.get('neighborhood');
    const category = searchParams.get('category');

    const where: any = {
      published: true
    };

    if (neighborhood) {
      where.neighborhood = {
        contains: neighborhood,
        mode: 'insensitive'
      };
    }

    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive'
      };
    }

    const merchants = await prisma.merchant.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(merchants);
  } catch (error) {
    console.error('Error fetching merchants:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
