export const parseInput = (previousInput, currentInput) => {
  const totalInput = previousInput + currentInput;
  const handlers = [
    {
      value: /\d/,
      test: /(^|[\/\+\-\*\(])0(\d)/, //=== solve leading zero issue
      convert: '$1$2'
    },
    {
      value: /\./,
      test: /(^|[\/\+\-\*])(\.)/, //=== insert zero before leading decimal dot
      convert: '$10$2'
    },
    {
      value: /\./,
      test: /\b(\d+\.)(\d+)?(\.)/, //=== solve duplicate decimal dot issue
      convert: '$1$2'
    },
    {
      value: /[\/\+\-\*]/,
      test: /^[\/\+\-\*]/, //=== solve leading operator issue
      convert: ''
    },
    {
      value: /[\/\+\-\*]/,
      test: /[\/\+\-\*](?=[\/\+\-\*])/, //=== solve consecutive operators issue
      convert: ''
    },
    {
      value: /\(\)/, //=== solve leading brackets issue
      test: /^(\(+)?\)/,
      convert: '$1'
    },
    {
      value: /\(\)/, //=== solve 'input opening bracket after an operator' issue
      test: /([\/\+\-\*])\(\)/,
      convert: '$1/)'
    }
  ];

  if (currentInput === '()') { // add handlers depending on the number of opening/closing brackets
    const openingBrackets = previousInput.match(/\(/g),
          closingBrackets = previousInput.match(/\)/g),
          openingBracketsNr = openingBrackets ? openingBrackets.length : 0,
          closingBracketsNr = closingBrackets ? closingBrackets.length : 0;
    if (openingBracketsNr > closingBracketsNr) {
      handlers.push({
        value: /\(\)/,
        test: /(\d|\.)\(\)/,
        convert: '$1)'
      });
    } else {
      handlers.push({
        value: /\(\)/,
        test: /(\d|\.|\))\(\)/,
        convert: '$1*('
      });
    }
  }

  const chosenHandlers = handlers.filter(handler => {
    let regexp = handler.value;
    return regexp.test(currentInput);
  });

  return chosenHandlers.reduce((a, b) => { //=== run accumulated input through all parser functions
    return a.replace(b.test, b.convert);
  }, totalInput);
}

export const deleteInput = (input) => {
  return input.slice(0, -1);
}

export const prepareInput = (input) => {
  if (/[+(-/*]$/.test(input)) {
    return input.slice(0, -1);
  } else {
    return input;
  }
}
