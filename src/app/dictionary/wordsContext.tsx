import React, {
  Dispatch, createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import { IWordData } from './lib/interface';

type IActionData = {
  type: 'added';
  id: number;
  wordName: string;
  meaning: string;
} | {
  type: 'changed';
  word: IWordData;
} | {
  type: 'deleted';
  id: number;
} | {
  type: 'loaded';
  words: IWordData[];
};

const WordsContext = createContext<IWordData[] | null>(null);
const WordsDispatchContext = createContext<Dispatch<IActionData> | null>(null);

function wordsReducer(words: IWordData[], action: IActionData) {
  switch (action.type) {
    case 'added': {
      return [...words, {
        id: action.id,
        wordName: action.wordName,
        meaning: action.meaning,
      }];
    }

    case 'changed': {
      return words.map((w) => {
        if (w.id === action.word.id) {
          return action.word;
        }
        return w;
      });
    }

    case 'deleted': {
      return words.filter((w) => w.id !== action.id);
    }

    case 'loaded': {
      return action.words;
    }

    default: {
      throw Error('Unknown action');
    }
  }
}

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [words, dispatch] = useReducer(
    wordsReducer,
    [],
  );
  const [isInitialState, setIsInitialState] = useState(true);

  useEffect(() => {
    if (isInitialState) {
      const loadSessionStorageData = async () => {
        const sessionData = sessionStorage.getItem('words');

        if (sessionData === null) {
          try {
            const res = await fetch('/dictionary/api/getWords', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await res.json();
            sessionStorage.setItem('words', JSON.stringify(data));

            dispatch({
              type: 'loaded',
              words: data,
            });
          } catch (err) {
            console.error(err);
          }
        } else {
          dispatch({
            type: 'loaded',
            words: JSON.parse(sessionData),
          });
        }
      };

      loadSessionStorageData();
      setIsInitialState(false);
    } else {
      sessionStorage.setItem('words', JSON.stringify(words));
    }
  }, [words]);

  return (
    <WordsContext.Provider value={words}>
      <WordsDispatchContext.Provider value={dispatch}>
        {children}
      </WordsDispatchContext.Provider>
    </WordsContext.Provider>
  );
}

export function useWords() {
  const words = useContext(WordsContext);
  if (!words) {
    throw new Error('Cannot find WordsProvider');
  }

  return words;
}

export function useWordsDispatch() {
  const dispatch = useContext(WordsDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find WordsProvider');
  }

  return dispatch;
}
