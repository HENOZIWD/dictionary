import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { id } = requestBody;
    const { wordName } = requestBody;
    const { meaning } = requestBody;

    if (!wordName || !meaning) {
      throw new Error('Invalid params.');
    }
    const newEntry = await prisma.dictionary.create({
      data: {
        id,
        wordName,
        meaning,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Request error', error);

    return NextResponse.json({ error: 'Error creating question', success: false });
  }
}
