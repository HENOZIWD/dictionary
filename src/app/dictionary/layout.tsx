'use client';

import React from 'react';
import Link from 'next/link';
import { WordsProvider } from './wordsContext';

export default function DictionaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WordsProvider>
      <nav>
        <div>navigation bar&#40;Dictionary&#41;</div>
        <div>
          <Link href="/dictionary">Dictionary</Link>
          <Link href="/dictionary/quiz">Quiz</Link>
        </div>
      </nav>
      {children}
    </WordsProvider>
  );
}
