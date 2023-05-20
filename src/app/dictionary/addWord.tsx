'use client';

import { useState } from 'react';
import { useWords, useWordsDispatch } from './wordsContext';

export default function AddWord() {

  const [wordName, setWordName] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');
  const words = useWords();
  const dispatch = useWordsDispatch();

  const handleAddWord = (event: React.MouseEvent) => {
    event.preventDefault();

    const trimmedWordName = wordName.trim();
    const trimmedMeaning = meaning.trim();

    if (trimmedWordName && trimmedMeaning) {
      setWordName('');
      setMeaning('');
      dispatch({
        type: 'added',
        id: words.length + 1,
        wordName: trimmedWordName,
        meaning: trimmedMeaning,
      });
    }
    else {
      alert('Please enter the word and meaning correctly.');
    }
  }

  return (
    <>
    
    <div>

      <label>
        Word name:&nbsp;
        <input
          type="text"
          value={wordName}
          onChange={e => setWordName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Meanings:&nbsp;
        <input
          type="text"
          value={meaning}
          onChange={e => setMeaning(e.target.value)}
        />
      </label>
      <br />
      <button
        type="button"
        onClick={handleAddWord}
      >Submit</button>

    </div>

    </>
  )
}