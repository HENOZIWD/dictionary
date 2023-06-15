'use client';

import React, { useState } from 'react';
import { useWords, useWordsDispatch } from './wordsContext';

export default function AddWord() {
  const words = useWords();
  const dispatch = useWordsDispatch();
  const [wordName, setWordName] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');

  const handleAddWord = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedWordName = wordName.trim();
    const trimmedMeaning = meaning.trim();

    if (trimmedWordName && trimmedMeaning) {
      setWordName('');
      setMeaning('');
      const nextId = words.length > 0 ? words[words.length - 1].id + 1 : 1;
      try {
        await fetch('/dictionary/api/addWord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: nextId,
            wordName: trimmedWordName,
            meaning: trimmedMeaning,
          }),
        });
        dispatch({
          type: 'added',
          id: nextId,
          wordName: trimmedWordName,
          meaning: trimmedMeaning,
        });
      } catch (err) {
        console.error(err);
      }
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
