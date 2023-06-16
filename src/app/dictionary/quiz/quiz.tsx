'use client';

import React, { useEffect, useState } from 'react';
import { getRandomInt, shuffleArray } from '../lib/random';
import { IAnswerData, IWordData } from '../lib/interface';
import Question from './question';
import Result from './result';

interface IQuizProps {
  words: IWordData[];
}

export default function Quiz({ words }: IQuizProps) {
  const [shuffledWords, setShuffledWords] = useState<IWordData[]>(() => shuffleArray(words, 10));
  const [wordIndex, setWordIndex] = useState(0);
  const [questionType, setQuestionType] = useState(
    () => (getRandomInt(0, 2) === 0 ? 'wordName' : 'meaning'),
  );
  const [answer, setAnswer] = useState<IAnswerData[]>([]);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (mount) {
      if (wordIndex < shuffledWords.length) {
        setQuestionType(getRandomInt(0, 2) === 0 ? 'wordName' : 'meaning');
        setWordIndex((prev) => prev + 1);
      }
    } else {
      setMount(true);
    }
  }, [answer]);

  const updateAnswer = (receivedAnswer: IAnswerData) => {
    setAnswer((prev) => [...prev, receivedAnswer]);
  };

  const retryQuiz = () => {
    setShuffledWords(shuffleArray(words, 10));
    setMount(false);
    setAnswer([]);
    setWordIndex(0);
  };

  return (
    <div>
      {shuffledWords.length > 0 && wordIndex < shuffledWords.length
      && (
        <Question
          qId={wordIndex}
          word={shuffledWords[wordIndex]}
          questionType={questionType}
          updateAnswer={updateAnswer}
        />
      )}
      {shuffledWords.length > 0 && wordIndex >= shuffledWords.length
       && (
       <>
         <div>Done!</div>
         <Result
           words={shuffledWords}
           answer={answer}
         />
         <button
           type="button"
           onClick={retryQuiz}
         >
           Retry?
         </button>
       </>
       )}
    </div>
  );
}
