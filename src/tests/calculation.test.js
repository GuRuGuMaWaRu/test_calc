import {
  calculate,
  parseBrackets,
  removeTrailingOperator,
  calculateOuter,
  calculateSimple } from '../utils/calculation';

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

describe('removeTrailingOperator', () => {
  it('removes trailing operator if there is such', () => {
    expect(removeTrailingOperator('65+')).toEqual('65');
    expect(removeTrailingOperator('65+87-565*')).toEqual('65+87-565');
    expect(removeTrailingOperator('65+87-565/')).toEqual('65+87-565');
    expect(removeTrailingOperator('65+87-565-')).toEqual('65+87-565');
  });
  it('returns unchanged input if there are no trailing operators', () => {
    expect(removeTrailingOperator('65+88')).toEqual('65+88');
    expect(removeTrailingOperator('4*54/2')).toEqual('4*54/2');
  });
});

describe('calculateOuter', () => {
  it('returns input unchanged if there are no operators', () => {
    expect(calculateOuter('54667546')).toEqual('54667546');
  });
  it('replaces the first [number][operator][number] expression with the result', () => {
    expect(calculateOuter('5+5+5')).toEqual('10+5');
  });
  it('replaces the first [number][operator][number] expression with the result', () => {
    expect(calculateOuter('5.5+5+5')).toEqual('10.5+5');
  });
});

describe('calculateSimple', () => {
  it('sums two simple numbers', () => {
    expect(calculateSimple('', '5', '+', '5')).toEqual('10');
  });
  it('subtracts the second number from the first', () => {
    expect(calculateSimple('', '10', '-', '5')).toEqual('5');
  });
  it('divides the first number by the second', () => {
    expect(calculateSimple('', '10', '/', '5')).toEqual('2');
  });
  it('multiplies the first number by the second', () => {
    expect(calculateSimple('', '10', '*', '5')).toEqual('50');
  });
});
