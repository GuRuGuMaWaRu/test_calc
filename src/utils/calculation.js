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

export const calculateOuter = (input) => {
  if (/^(\-)?\d+(\.)?(\d+)?$/.test(input)) { // return if only one number is left
    return input.toLocaleString('en-US', {maximumFractionDigits: 10}); // ???????????????????????? doesnt work because its a number and not a string
  } else {
    return calculateOuter(input.replace(/^([\d\.]+)([\/\+\-\*])([\d\.]+)/, calculateSimple));
  }
}

export const calculationParser = (input) => {
  if (/^(\-)?\d+(\.)?(\d+)?$/.test(input)) { // returns if there is only one number left
    input = Number(input);
    return input.toLocaleString('en-US', {maximumFractionDigits: 10});
  }
  if (/[\/\+\-\*]$/.test(input)) { // removes trailing operator if present
    return calculationParser(input.slice(0, -1));
  }
  if (input.indexOf('(') !== -1) { // follows this branch if there are opening brackets
    if (input.indexOf(')') === -1) { // if there are only opening brackets, removes them
      input = input.replace(/\(/g, '');
      return calculationParser(input); // calls calculationParser again, but this time without brackets
    } else { // extracts the first bracketed expression
      const firstClosingBracket = input.indexOf(')');
      const lastOpeningBracket = input.lastIndexOf('(', firstClosingBracket);
      const inputBefore = input.slice(0, lastOpeningBracket);
      const inputAfter = input.slice(firstClosingBracket + 1);
      const inputInBrackets = input.slice(lastOpeningBracket + 1, firstClosingBracket);
      const newInput = inputBefore + calculateOuter(inputInBrackets) + inputAfter;
      return calculationParser(newInput);
    }
  } else  { // there are no brackets
    return calculateOuter(input);
  }
}
