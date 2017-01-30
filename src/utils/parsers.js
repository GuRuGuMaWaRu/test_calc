const parseInput = (input) => {
  let match = '';
  match = input.replace(/\b0{2,}/, ''); //=== remove leading zeroes
  match = match.replace(/^\./, '0.'); //=== insert zero before leading decimal dot
  match = match.replace();
  return match;
}

export default parseInput;
