import { useWordsDispatch } from "./wordsContext";

interface IDeleteWordProps {
  id: number;
}

export default function DeleteWord({ id }: IDeleteWordProps) {

  const dispatch = useWordsDispatch();

  return (
    <>

    <button
      type="button"
      onClick={() => {
        dispatch({
          type: 'deleted',
          id: id
        });
      }}
    >
      Delete
    </button>

    </>
  )
}