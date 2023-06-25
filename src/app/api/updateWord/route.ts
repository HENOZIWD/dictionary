import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { wordId } = requestBody;
    const { wordName } = requestBody;
    const { meaning } = requestBody;
    const { userId } = requestBody;
    const newEntry = await prisma.word.update({
      where: {
        id_userId: { id: wordId, userId },
      },
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
