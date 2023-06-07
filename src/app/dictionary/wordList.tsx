import React, { useState } from 'react';
import { IWordData, useWords, useWordsDispatch } from './wordsContext';

function Word({ word }: IWordProps) {
  const dispatch = useWordsDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editWordName, setEditWordName] = useState<string>(word.wordName);
  const [editMeaning, setEditMeaning] = useState<string>(word.meaning);

  const handleEditSave = (event: React.MouseEvent) => {
    event.preventDefault();

    const trimmedWordName = editWordName.trim();
    const trimmedMeaning = editMeaning.trim();

    if (trimmedWordName && trimmedMeaning) {
      dispatch({
        type: 'changed',
        word: {
          ...word,
          wordName: trimmedWordName,
          meaning: trimmedMeaning,
        },
      });

      setIsEditing(false);
    } else {
      alert('Please enter the word and meaning correctly.');
    }
  };

  return (
    <div>
      {!isEditing
        ? (
          <>
            {word.id}
            .
            {word.wordName}
            :
            {word.meaning}
            &nbsp;
            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            <button
              type="button"
              onClick={() => {
                dispatch({
                  type: 'deleted',
                  id: word.id,
                });
              }}
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
          <Word word={word} />
        </li>
      ))}
    </ul>
  );
}

interface IWordProps {
  word: IWordData;
}
