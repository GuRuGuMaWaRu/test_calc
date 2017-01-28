const parseInput = (input) => {
  let match = input.replace(/\b0{2,}/, ''); //=== remove leading zeroes
  match = match.replace(/^\./, '0.');
  console.log(match);
  return match;
}

export default parseInput;
