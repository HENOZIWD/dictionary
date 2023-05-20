import { useWords } from "./wordsContext";

export default function WordList() {
  const words = useWords();

  return (
    <>

    <ul>
      {words.map((word) => (
        <li key={word.id}>
          {word.id}. {word.wordName} : {word.meaning}
        </li>
      ))}
    </ul>

    </>
  )
}