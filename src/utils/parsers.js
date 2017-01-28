const parseInput = (input) => {
  let match = input.replace(/\b0{2,}/, ''); //=== remove leading zeroes
  console.log(match);
  return match;
}

export default parseInput;
