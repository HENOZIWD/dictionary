import React, {
  Dispatch, createContext, useContext, useReducer,
} from 'react';

export interface IWordData {
  id: number;
  wordName: string;
  meaning: string;
}

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

    default: {
      throw Error('Unknown action');
    }
  }
}

const initialWords: IWordData[] = [];

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [words, dispatch] = useReducer(
    wordsReducer,
    initialWords,
  );

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
