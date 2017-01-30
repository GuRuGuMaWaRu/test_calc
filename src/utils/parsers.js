const parseInput = (input) => {
  let match = '';
  match = input.replace(/\b0([0-9])/, '$1'); //=== remove leading zeroes
  match = match.replace(/^\./, '0.'); //=== insert zero before leading decimal dot
  match = match.replace();
  return match;
}

export default parseInput;
