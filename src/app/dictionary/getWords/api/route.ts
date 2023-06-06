import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const newEntry = await prisma.dictionary.findMany();
    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error creating question', success: false });
  }
}
