import React, { useState, useRef, useEffect } from 'react';
import { IWordData, IAnswerData } from '../../lib/interface';

interface IQuestionProps {
  qId: number;
  word: IWordData;
  questionType: string;
  updateAnswer: (receivedAnswer: IAnswerData) => void;
}

export default function Question({
  qId, word, questionType, updateAnswer,
}: IQuestionProps) {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitAnswer = (event: React.FormEvent) => {
    event.preventDefault();

    updateAnswer({ qId, questionType, answer });
    setAnswer('');
  };

  return (
    <form onSubmit={submitAnswer}>
      {questionType === 'meaning' && <div>{word.wordName}</div>}
      <div>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          ref={inputRef}
        />
      </div>
      {questionType === 'wordName' && <div>{word.meaning}</div>}
      <button type="submit">
        Submit
      </button>
    </form>
  );
}
