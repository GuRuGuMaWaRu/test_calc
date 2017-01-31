const parseInput = (input) => {
  let match = '';
  match = input.replace(/(^|[\/\+\-\*\(])0([0-9])/, '$2'); //=== solve leading zero issue
  match = match.replace(/(^|[\/\+\-\*])(\.)/, '$10$2'); //=== insert zero before leading decimal dot
  match = match.replace(/\b(\d+\.)(\d+)?(\.)/, '$1$2'); //=== solve duplicate decimal dot issue
  match = match.replace(/^[\/\+\-\*]/, ''); //=== solve leading operator issue
  match = match.replace(/[\/\+\-\*](?=[\/\+\-\*])/, ''); //=== solve consecutive operators issue
  return match;
}

export default parseInput;
