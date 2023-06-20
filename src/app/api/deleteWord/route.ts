import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { id } = requestBody;
    const newEntry = await prisma.dictionary.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Request error', error);

    return NextResponse.json({ error: 'Error creating question', success: false });
  }
}
