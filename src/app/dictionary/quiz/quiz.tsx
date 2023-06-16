'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getRandomInt, shuffleArray } from '../lib/random';
import { useWords } from '../wordsContext';
import { IWordData, IAnswerData } from '../lib/interface';

interface IQuestionProps {
  word: IWordData;
  questionType: string;
  updateAnswer: (receivedAnswer: IAnswerData) => void;
}

function Question({ word, questionType, updateAnswer }: IQuestionProps) {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitAnswer = (event: React.FormEvent) => {
    event.preventDefault();

    updateAnswer({ questionType, answer });
    setAnswer('');
  };

  return (
    <form onSubmit={submitAnswer}>
      {questionType === 'meaning' && <div>{word.wordName}</div>}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        ref={inputRef}
      />
      {questionType === 'wordName' && <div>{word.meaning}</div>}
      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default function Quiz() {
  const words: IWordData[] = shuffleArray(useWords(), 10);
  const [wordIndex, setWordIndex] = useState(0);
  const [questionType, setQuestionType] = useState(
    () => (getRandomInt(0, 2) === 0 ? 'wordName' : 'meaning'),
  );
  const [answer, setAnswer] = useState<IAnswerData[]>([]);

  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (mount) {
      if (wordIndex < words.length) {
        setWordIndex((prev) => prev + 1);
        setQuestionType(getRandomInt(0, 2) === 0 ? 'wordName' : 'meaning');
      }
    } else {
      setMount(true);
    }
  }, [answer]);

  const updateAnswer = (receivedAnswer: IAnswerData) => {
    setAnswer((prev) => [...prev, receivedAnswer]);
  };

  return (
    <div>
      {words.length > 0 && wordIndex < words.length
      && (
        <Question
          word={words[wordIndex]}
          questionType={questionType}
          updateAnswer={updateAnswer}
        />
      )}
      {words.length > 0 && wordIndex >= words.length
       && (
       <>
         <div>Done!</div>
         <button
           type="button"
           onClick={() => {
             setMount(false);
             setAnswer([]);
             setWordIndex(0);
           }}
         >
           Retry?
         </button>
       </>
       )}
    </div>
  );
}
