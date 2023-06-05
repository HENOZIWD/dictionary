'use client';

import React, { useState } from 'react';
import { useWords, useWordsDispatch } from './wordsContext';

export default function AddWord() {
  const [wordName, setWordName] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');
  const words = useWords();
  const dispatch = useWordsDispatch();

  const handleAddWord = (event: React.FormEvent) => {
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
    } else {
      alert('Please enter the word and meaning correctly.');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddWord}>
        <label htmlFor="word-name">
          Word name:&nbsp;
          <input
            id="word-name"
            type="text"
            value={wordName}
            onChange={(e) => setWordName(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="meaning">
          Meanings:&nbsp;
          <input
            id="meaning"
            type="text"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
