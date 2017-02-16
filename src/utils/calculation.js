export const calculateSimple = (_match, firstNumber, operator, secondNumber) => {
  const floatingPoint = firstNumber.indexOf('.') !== -1 || secondNumber.indexOf('.') !== -1;

  if (floatingPoint) { // convert string numbers into true numbers
    firstNumber = Number.parseFloat(firstNumber, 10);
    secondNumber = Number.parseFloat(secondNumber, 10);
  } else {
    firstNumber = Number.parseInt(firstNumber, 10);
    secondNumber = Number.parseInt(secondNumber, 10);
  }
  switch(operator) { // perform a calculation depending on passed operator
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      return firstNumber / secondNumber;
    default:
      return '';
  }
}

export const calculateOuter = (input) => {
  // console.log(input);
  if (/^(\-)?\d+(\.)?(\d+)?$/.test(input)) { // return if only one number is left
    // console.log('calculateOuter output', input);
    input = Number(input);
    return input.toLocaleString('en-US', {maximumFractionDigits: 10});
  } else {
    // console.log('calculateOuter input', input);
    return calculateOuter(input.replace(/^(\-?[\d\.]+)([\/\+\-\*])(\-?[\d\.]+)/, calculateSimple));
  }
}

export const calculateBracketedExpression = (input) => {
  const expressionStart = input.lastIndexOf('(');
  const expressionEnd = input.indexOf(')', expressionStart) === -1
    ? input.length
    : input.indexOf(')', expressionStart);
  const inputHead = input.slice(0, expressionStart);
  const inputTail = expressionEnd === input.length
    ? ''
    : input.slice(expressionEnd + 1);
  const expression = expressionEnd === input.length
    ? input.slice(expressionStart + 1)
    : input.slice(expressionStart + 1, expressionEnd);

  // console.log('bracketedExpression', expression);
  return inputHead + calculateOuter(expression) + inputTail;
}

export const calculationParser = (input) => {
  if (input.length === 0) { // solve issue with empty input
    return input;
  }
  if (/[\/\+\-\*\(]$/.test(input)) {
    return calculationParser(input.slice(0, -1)); // remove trailing operator ot bracket if present
  }
  if (input.indexOf('(') !== -1) { // follow this branch if there are opening brackets
    if (input.indexOf(')') === -1) { // if there are only opening brackets, remove them
      return calculationParser(input.replace(/\(/g, '')); // call calculationParser again, but this time without brackets
    } else {
      return calculationParser(calculateBracketedExpression(input)); // calculate one bracketed expression & repeat
    }
  } else  { // there are no brackets
    return calculateOuter(input);
  }
}
