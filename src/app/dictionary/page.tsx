'use client';

import AddWord from './addWord';
import WordList from './wordList';
import { WordsProvider } from './wordsContext';

export default function Dictionary() {

  return (
    <>

    <WordsProvider>
    
      <div>
        dictionary
      </div>

      <AddWord />
      <WordList />

    </WordsProvider>

    </>
  )
}