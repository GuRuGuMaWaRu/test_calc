export const calculate = (input) => {
  const calculation = new Function('', 'return ' + input + ';');
  return calculation();
}

export const parseBrackets = (input) => {
  if (input.indexOf('(') !== -1) {
    if (input.indexOf(')') === -1) { // if there are only opening brackets, remove them
      input = input.replace(/\(/g, '');
    } else {
      const firstClosingBracket = input.indexOf(')');
      const lastOpeningBracket = input.lastIndexOf('(', firstClosingBracket);
      return input.slice(firstClosingBracket + 1, lastOpeningBracket);
    }
  }
  return input;
}
