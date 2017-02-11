import {
  calculationParser,
  calculateOuter,
  calculateSimple } from '../utils/calculation';

describe('calculationParser', () => {
  it('returns input if there is only one number without brackets and operators', () => {
    expect(calculationParser('6546')).toEqual('6,546');
  });
  it('removes a trailing operator if there is any one present', () => {
    expect(calculationParser('65+')).toEqual('65');
  });
  it('removes all opening brackets if there are no closing brackets', () => {
    expect(calculationParser('((67')).toEqual('67');
  });
  it('performs calculation (without brackets)', () => {
    expect(calculationParser('6+4')).toEqual('10');
    expect(calculationParser('6+4+10')).toEqual('20');
    expect(calculationParser('6*6')).toEqual('36');
    expect(calculationParser('81/9')).toEqual('9');
    expect(calculationParser('6.7+3.4')).toEqual('10.1');
    expect(calculationParser('6.41+1.543')).toEqual('7.953');
  });
  it('performs calculation (with brackets)', () => {
    expect(calculationParser('(5+5)')).toEqual('10');
    expect(calculationParser('(5+5)+(10+10)')).toEqual('30');
    expect(calculationParser('(5*5)+(10/2)')).toEqual('30');
    expect(calculationParser('(50*10)/(10*1)')).toEqual('50');
    expect(calculationParser('(((((50*10)/(10*1)')).toEqual('50');
    expect(calculationParser('(((((50*10)/(10*1')).toEqual('50');
  });
  it('deals with long floating point numbers', () => {
    expect(calculationParser('(5.32453245+2.123456789)')).toEqual('7.447989239');
    expect(calculationParser('(5.1234567891+2.1234567891)')).toEqual('7.2469135782');
  });
  it('allows negative results', () => {
    expect(calculationParser('-10')).toEqual('-10');
    expect(calculationParser('5-10')).toEqual('-5');
    expect(calculationParser('10-686')).toEqual('-676');
  });
  it('uses thousand separators', () => {
    expect(calculationParser('28000')).toEqual('28,000');
    expect(calculationParser('999+1')).toEqual('1,000');
    expect(calculationParser('28000+100000')).toEqual('128,000');
  })
});

describe('calculateOuter', () => {
  it('returns input unchanged if there are no operators', () => {
    expect(calculateOuter('54667546')).toEqual('54667546');
  });
  it('returns the result of complex math calculation', () => {
    expect(calculateOuter('5+5+5')).toEqual('15');
  });
  it('returns the result of complex math calculation (with floats)', () => {
    expect(calculateOuter('5.5+5+5')).toEqual('15.5');
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
