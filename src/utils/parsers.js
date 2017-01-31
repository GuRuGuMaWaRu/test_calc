const parseInput = (input, value) => {
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
      value: /\(\)/,
      test: /^(\(+)?\)/,
      convert: '$1'
    }
  ];
  const chosenHandlers = handlers.filter(handler => {
    let regexp = handler.value;
    return regexp.test(value);
  });

  return chosenHandlers.reduce((a, b) => { //=== run accumulated input through all parser functions
    return a.replace(b.test, b.convert);
  }, input);
}

export default parseInput;
