const parseInput = (input) => {
  const handlers = [
    {
      test: /(^|[\/\+\-\*\(])0([0-9])/, //=== solve leading zero issue
      convert: '$1$2'
    },
    {
      test: /(^|[\/\+\-\*])(\.)/, //=== insert zero before leading decimal dot
      convert: '$10$2'
    },
    {
      test: /\b(\d+\.)(\d+)?(\.)/, //=== solve duplicate decimal dot issue
      convert: '$1$2'
    },
    {
      test: /^[\/\+\-\*]/, //=== solve leading operator issue
      convert: ''
    },
    {
      test: /[\/\+\-\*](?=[\/\+\-\*])/, //=== solve consecutive operators issue
      convert: ''
    }
  ];

  return handlers.reduce((a, b) => { //=== run accumulated input through all parser functions
    return a.replace(b.test, b.convert);
  }, input);
}

export default parseInput;
