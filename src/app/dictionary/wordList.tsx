import React, { useState } from 'react';
import { useWords, useWordsDispatch } from './wordsContext';
import { IWordData } from './lib/interface';

interface IWordProps {
  index: number;
  word: IWordData;
}

function Word({ index, word }: IWordProps) {
  const dispatch = useWordsDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editWordName, setEditWordName] = useState<string>(word.wordName);
  const [editMeaning, setEditMeaning] = useState<string>(word.meaning);

  const handleEditSave = async (event: React.MouseEvent) => {
    event.preventDefault();

    const trimmedWordName = editWordName.trim();
    const trimmedMeaning = editMeaning.trim();

    if (trimmedWordName && trimmedMeaning) {
      if (trimmedWordName !== word.wordName || trimmedMeaning !== word.meaning) {
        try {
          await fetch('/dictionary/api/updateWord', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: word.id,
              wordName: trimmedWordName,
              meaning: trimmedMeaning,
            }),
          });

          dispatch({
            type: 'changed',
            word: {
              ...word,
              wordName: trimmedWordName,
              meaning: trimmedMeaning,
            },
          });
        } catch (err) {
          console.error(err);
        }
      }

      setIsEditing(false);
    } else {
      alert('Please enter the word and meaning correctly.');
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await fetch('/dictionary/api/deleteWord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: word.id,
        }),
      });

      dispatch({
        type: 'deleted',
        id: word.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!isEditing
        ? (
          <>
            {index}
            .
            {word.wordName}
            :
            {word.meaning}
            &nbsp;
            <button
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit

            </button>
            <button
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )
        : (
          <>
            <input
              type="text"
              value={editWordName}
              onChange={(e) => setEditWordName(e.target.value)}
            />
            <input
              type="text"
              value={editMeaning}
              onChange={(e) => setEditMeaning(e.target.value)}
            />
            <button
              type="button"
              onClick={handleEditSave}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditWordName(word.wordName);
                setEditMeaning(word.meaning);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
    </div>
  );
}

export default function WordList() {
  const words = useWords();

  return (
    <ul>
      {words.map((word) => (
        <li key={word.id}>
          <Word
            index={word.id}
            word={word}
          />
        </li>
      ))}
    </ul>
  );
}
