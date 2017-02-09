export const calculate = (input) => {
  const calculation = new Function('', 'return ' + input + ';');
  return calculation();
}

export const calculationParser = (input) => {
  if (/^\d+(\.)?(\d+)?$/.test(input)) { // return if only one number is left
    return input;
  }
  if (/[\/\+\-\*]$/.test(input)) { // remove trailing operator if present
    return calculationParser(input.slice(0, -1));
  }
  if (input.indexOf('(') !== -1) { // there are opening brackets
    if (input.indexOf(')') === -1) { // if there are only opening brackets, remove them
      input = input.replace(/\(/g, '');
      return calculationParser(input); // repeat, but this time without any bracketed expressions
    } else { // extract the first bracketed expression
      // const firstClosingBracket = input.indexOf(')');
      // const lastOpeningBracket = input.lastIndexOf('(', firstClosingBracket);
      // return calculateOuter(input.slice(lastOpeningBracket + 1, firstClosingBracket));
    }
  } else  { // there are no brackets
    return calculateOuter(input);
  }
}

export const calculateOuter = (input) => {
  if (/^\d+(\.)?(\d+)?$/.test(input)) { // return if only one number is left
    // calculationParser(input);
    return input;
  } else {
    return calculateOuter(input.replace(/^([\d\.]+)([\/\+\-\*])([\d\.]+)/, calculateSimple));
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
