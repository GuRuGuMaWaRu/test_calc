const parseInput = (input) => {
  let match = '';
  match = input.replace(/\b0([0-9])/, '$1'); //=== remove leading zeroes
  match = match.replace(/(^|[+-/*])(\.)/, '$10$2'); //=== insert zero before leading decimal dot
  // match = match.match(/(^|[+-/*]|\b)\d+(\.)?(\d+|[+-/*])/); //=== solve duplicate decimal dot issue
  return match;
}

export default parseInput;
