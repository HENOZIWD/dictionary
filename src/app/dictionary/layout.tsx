'use client';

import { WordsProvider } from './wordsContext';

export default function DictionaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <>
    
    <WordsProvider>
      {children}
    </WordsProvider>

    </>
  )
}
