import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/app/lib/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { userId } = requestBody;
    const newEntry = await prisma.word.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Request error', error);

    return NextResponse.json({ error: 'Error creating question', success: false });
  }
}
