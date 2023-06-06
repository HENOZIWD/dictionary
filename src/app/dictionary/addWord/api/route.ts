import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/client';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wordName = searchParams.get('wordName');
    const meaning = searchParams.get('meaning');

    if (!wordName || !meaning) {
      throw new Error('Invalid params.');
    }
    const newEntry = await prisma.dictionary.create({
      data: {
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
