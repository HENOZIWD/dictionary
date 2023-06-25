'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useWords, useWordsDispatch } from './wordsContext';

export default function AddWord() {
  const words = useWords();
  const dispatch = useWordsDispatch();
  const [wordName, setWordName] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');
  const wordNameInputRef = useRef<HTMLInputElement>(null);
  const meaningInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (wordNameInputRef.current) {
      wordNameInputRef.current.focus();
    }
  }, []);

  const handleAddWord = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedWordName = wordName.trim();
    const trimmedMeaning = meaning.trim();

    if (trimmedWordName && trimmedMeaning) {
      const nextId = words.length > 0 ? words[words.length - 1].id + 1 : 1;
      try {
        await fetch('/api/addWord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wordId: nextId,
            wordName: trimmedWordName,
            meaning: trimmedMeaning,
            userId: sessionStorage.getItem('userId'),
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
      } finally {
        if (wordNameInputRef.current) {
          wordNameInputRef.current.focus();
        }

        setWordName('');
        setMeaning('');
      }
    } else {
      alert('Please enter the word and meaning correctly.');
      if (!trimmedWordName) {
        if (wordNameInputRef.current) {
          wordNameInputRef.current.focus();
        }
      } else if (meaningInputRef.current) {
        meaningInputRef.current.focus();
      }
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
            ref={wordNameInputRef}
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
            ref={meaningInputRef}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
