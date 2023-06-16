import React from 'react';
import { IWordData, IAnswerData } from '../lib/interface';

interface IResultProps {
  words: IWordData[];
  answer: IAnswerData[];
}

export default function Result({ words, answer }: IResultProps) {
  return (
    <ul>
      {answer.map((ans) => (
        <li key={ans.qId}>
          <div>
            <div>
              {ans.qId + 1}
              .
            </div>
            {ans.questionType === 'wordName' ? (
              <>
                <div>
                  <input type="text" value={ans.answer} disabled />
                  :
                  {' '}
                  {words[ans.qId].meaning}
                </div>
                <div>
                  Answer:
                  {' '}
                  {words[ans.qId].wordName}
                </div>
              </>
            ) : (
              <>
                <div>
                  {words[ans.qId].wordName}
                  :
                  {' '}
                  <input type="text" value={ans.answer} disabled />
                </div>
                <div>
                  Answer:
                  {' '}
                  {words[ans.qId].meaning}
                </div>
              </>
            )}
            <br />
          </div>
        </li>
      ))}
    </ul>
  );
}
