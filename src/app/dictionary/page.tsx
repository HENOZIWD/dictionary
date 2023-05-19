'use client';

import Form from './form';
import { useState } from 'react';

export interface IWordData {
  wordName: string;
  meaning: string;
}

export default function Dictionary() {

  const [words, setWords] = useState<IWordData[]>([]);

  const handleWordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const submittedWordName = formData.get('wordName')?.toString()?.trim();
    const submittedMeaning = formData.get('meaning')?.toString()?.trim();
    
    if (submittedWordName && submittedMeaning) {
      const wordsCopy = words.slice();
      wordsCopy.push({
        wordName: submittedWordName,
        meaning: submittedMeaning
      });

      // console.log(wordsCopy);

      setWords(wordsCopy);
      event.currentTarget.reset();
    }
    else {
      alert('Please enter the word and meaning correctly.');
    }
  }

  return (
    <>
    
    <div>
      dictionary
    </div>

    <Form handleWordSubmit={handleWordSubmit} />

    <div>My Words</div>
    <ul>
    {words.map((word, index) => (
      <li key={index}>
        {index + 1}. {word.wordName} : {word.meaning}
      </li>
    ))}
    </ul>

    </>
  )
}