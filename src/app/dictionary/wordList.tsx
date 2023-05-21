import DeleteWord from "./deleteWord";
import { useWords } from "./wordsContext";

export default function WordList() {
  const words = useWords();

  return (
    <>

    <ul>
      {words.map((word) => (
        <li key={word.id}>
          {word.id}. {word.wordName} : {word.meaning}&nbsp;
          <DeleteWord id={word.id} />
        </li>
      ))}
    </ul>

    </>
  )
}