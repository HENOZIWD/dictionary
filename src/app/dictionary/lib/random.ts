export function getRandomInt(min: number, max: number) {
  // Maximum is exclusive, minimum is inclusive.
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}
