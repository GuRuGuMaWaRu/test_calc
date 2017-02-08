import {
  calculate,
  removeTrailingOperator,
  calculationParser,
  calculateOuter,
  calculateSimple } from '../utils/calculation';

describe('calculate', () => {
  it('creates code from string', () => {
    expect(calculate('5+5')).toEqual(10);
    expect(calculate('5/2')).toEqual(2.5);
  });
});

describe('calculationParser', () => {
  it.skip('removes all opening brackets if there are no closing brackets', () => {
    expect(calculationParser('((67+12+(')).toEqual('67+12+');
  });
  it.skip('extracts the first bracketed expression', () => {
    expect(calculationParser('(6+2)+(8+1)')).toEqual('6+2');
  });
  it('returns single number if there are no operators present', () => {
    expect(calculationParser('6546')).toEqual('6546');
  });
  it('adds two numbers', () => {
    expect(calculationParser('6+4')).toEqual('10');
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
  it.skip('returns input unchanged if there are no operators', () => {
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
