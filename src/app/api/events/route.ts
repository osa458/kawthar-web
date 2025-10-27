import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const neighborhood = searchParams.get('neighborhood');
    const category = searchParams.get('category');
    const dateRange = searchParams.get('dateRange');

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

    if (dateRange) {
      const [start, end] = dateRange.split(',');
      where.date = {
        gte: start,
        lte: end
      };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
