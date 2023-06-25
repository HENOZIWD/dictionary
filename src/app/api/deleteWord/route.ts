import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { wordId } = requestBody;
    const { userId } = requestBody;
    const newEntry = await prisma.word.delete({
      where: {
        id_userId: { id: wordId, userId },
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Request error', error);

    return NextResponse.json({ error: 'Error creating question', success: false });
  }
}
