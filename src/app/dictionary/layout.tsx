'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { WordsProvider } from './wordsContext';

export default function DictionaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <WordsProvider>
        {children}
      </WordsProvider>
    );
  }

  return <div>Sign in required.</div>;
}
