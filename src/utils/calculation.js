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
    input = Number(input);
    return input.toLocaleString('en-US', {maximumFractionDigits: 10});
  } else {
    return calculateOuter(input.replace(/^(\-?[\d\.]+)([\/\+\-\*])(\-?[\d\.]+)/, calculateSimple));
  }
}

export const calculationParser = (input) => {
  if (input.length === 0) { // solves issue with empty input
    return input;
  }
  if (/[\/\+\-\*\(]$/.test(input)) { // removes trailing operator ot bracket if present
    return calculationParser(input.slice(0, -1));
  }
  if (input.indexOf('(') !== -1) { // follows this branch if there are opening brackets
    if (input.indexOf(')') === -1) { // if there are only opening brackets, removes them
      return calculationParser(input.replace(/\(/g, '')); // calls calculationParser again, but this time without brackets
    } else { // extracts the first bracketed expression
      const expressionStart = input.lastIndexOf('(');
      const expressionEnd = input.indexOf(')', expressionStart) || input.length - 1;
      const inputHead = input.slice(0, expressionStart);
      const inputTail = expressionEnd < input.length - 1 ? input.slice(expressionEnd + 1) : '';

      let expression = input.slice(expressionStart + 1, expressionEnd);

      // const lastOpeningBracket = input.lastIndexOf('(');
      // let expression = input.slice(lastOpeningBracket + 1);
      // const inputBefore = input.slice(0, lastOpeningBracket);

      // expression = expression.replace(/\)/g, ''); // remove all closing brackets

      // const firstClosingBracket = input.indexOf(')');
      // const lastOpeningBracket = input.lastIndexOf('(', firstClosingBracket);
      // const inputAfter = input.slice(firstClosingBracket + 1);
      // const inputInBrackets = input.slice(lastOpeningBracket + 1, firstClosingBracket);
      // const newInput = inputBefore + calculateOuter(inputInBrackets) + inputAfter;
      // console.log(expression);
      return calculationParser(inputHead + calculateOuter(expression) + inputTail);
    }
  } else  { // there are no brackets
    return calculateOuter(input);
  }
}
