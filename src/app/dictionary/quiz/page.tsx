'use client';

import React from 'react';
import Quiz from './quiz';
import { useWords } from '../wordsContext';

export default function QuizMain() {
  const words = useWords();

  return (
    <div>
      {words.length > 0 && <Quiz words={words} />}
    </div>
  );
}
