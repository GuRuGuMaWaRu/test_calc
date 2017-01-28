const parseInput = (input) => {
  let match = input.match(/^[^00]\d/);
  console.log(match);
  return match;
}

export default parseInput;
