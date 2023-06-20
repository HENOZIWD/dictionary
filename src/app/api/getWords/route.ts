import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/client';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const newEntry = await prisma.dictionary.findMany();

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Request error', error);

    return NextResponse.json({ error: 'Error creating question', success: false });
  }
}
