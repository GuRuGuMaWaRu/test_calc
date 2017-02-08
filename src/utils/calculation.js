export const calculate = (input) => {
  const calculation = new Function('', 'return ' + input + ';');
  return calculation();
}

export const parseBrackets = (input) => {
  if (input.indexOf('(') !== -1) {
    if (input.indexOf(')') === -1) { // if there are only opening brackets, remove them
      input = input.replace(/\(/g, '');
      parseBrackets(input); // repeat, but this time without any bracketed expressions
    } else { // extract the first bracketed expression
      const firstClosingBracket = input.indexOf(')');
      const lastOpeningBracket = input.lastIndexOf('(', firstClosingBracket);
      return input.slice(lastOpeningBracket + 1, firstClosingBracket);
    }
  } else {

  }
  return input;
}

export const removeTrailingOperator = (input) => {
  if (/[\/\+\-\*]$/.test(input)) {
    return input.slice(0, -1);
  } else {
    return input;
  }
}

export const calculateOuter = (input) => {
  if (input.search(/[+-/*]/) === -1) {
    return input;
  } else {
    return input.replace(/^([\d\.]+)([\/\+\-\*])([\d\.]+)/, calculateSimple);
  }
}

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
      return (firstNumber + secondNumber).toString();
    case '-':
      return (firstNumber - secondNumber).toString();
    case '*':
      return (firstNumber * secondNumber).toString();
    case '/':
      return (firstNumber / secondNumber).toString();
    default:
      return '';
  }
}
