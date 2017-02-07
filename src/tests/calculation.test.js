import { calculate, parseBrackets, calculateOuter, calculateSimple } from '../utils/calculation';

describe('calculate', () => {
  it('creates code from string', () => {
    expect(calculate('5+5')).toEqual(10);
    expect(calculate('5/2')).toEqual(2.5);
  });
});

describe('parseBrackets', () => {
  it('removes all opening brackets if there are no closing brackets', () => {
    expect(parseBrackets('((67+12+(')).toEqual('67+12+');
  });
  it('extracts the first bracketed expression', () => {
    expect(parseBrackets('(6+2)+(8+1)')).toEqual('6+2');
  });
});

describe('calculateOuter', () => {
  it('returns input unchanged if there are no operators', () => {
    expect(calculateOuter('54667546')).toEqual('54667546');
  });
});

describe('calculateSimple', () => {
  it('sums two simple numbers', () => {
    expect(calculateSimple('5', '+', '5')).toEqual('10');
  });
});
