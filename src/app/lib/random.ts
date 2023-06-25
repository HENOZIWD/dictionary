export function getRandomInt(min: number, max: number) {
  // Maximum is exclusive, minimum is inclusive.
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

export function shuffleArray(arr: any[], shuffleLength: number) {
  if (arr.length < shuffleLength) {
    return arr;
  }

  const arrCopy = arr.slice();

  for (let i = 0; i < shuffleLength; i += 1) {
    const j = getRandomInt(i, arrCopy.length);

    const temp = arrCopy[i];
    arrCopy[i] = arrCopy[j];
    arrCopy[j] = temp;
  }

  return arrCopy.slice(0, shuffleLength);
}
