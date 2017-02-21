import {
  tooLarge,
  calculationParser,
  calculateOuter,
  calculateSimple } from '../utils/calculation';

describe('tooLarge', () => {
  it('return true if the number is longer than 15 digits before decimal dot', () => {
    expect(tooLarge('9999999999999999')).toBeTruthy();
  });
  it('return false if the number is shorter or equal to 15 digits before decimal dot', () => {
    expect(tooLarge('999999999999999')).toBeFalsy();
  });
});

describe('calculationParser', () => {
  it('returns input if there is only one number without brackets and operators', () => {
    expect(calculationParser('6546')).toEqual('6,546');
  });
  it('removes trailing operator', () => {
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
    expect(calculationParser('(((((50*10)/(10*1)')).toEqual('50');
    expect(calculationParser('(2)*(3-2)')).toEqual('2');
  });
  it('deals with negative numbers & brackets', () => {
    expect(calculationParser('(2-3)')).toEqual('-1');
    expect(calculationParser('(2-3)+')).toEqual('-1');
    expect(calculationParser('(2-3)-1')).toEqual('-2');
    expect(calculationParser('(2-3)+1')).toEqual('0');
    expect(calculationParser('(2)*(2-3)')).toEqual('-2');
    expect(calculationParser('(23)*(2-87)')).toEqual('-1,955');
  });
  it('deals separately with unclosed bracketed expressions', () => {
    expect(calculationParser('(5+5)+(')).toEqual('10');
    expect(calculationParser('(23)*(2-87')).toEqual('-1,955');
  })
  it('deals with negative numbers', () => {
    expect(calculationParser('-10')).toEqual('-10');
    expect(calculationParser('2-3')).toEqual('-1');
    expect(calculationParser('(-1+2')).toEqual('1');
    expect(calculationParser('5+(-2')).toEqual('3');
  });
  it('deals with long floating point numbers', () => {
    expect(calculationParser('(5.32453245+2.123456789)')).toEqual('7.447989239');
    expect(calculationParser('(5.1234567891+2.1234567891)')).toEqual('7.2469135782');
  });
  it('uses thousand separators', () => {
    expect(calculationParser('28000')).toEqual('28,000');
    expect(calculationParser('999+1')).toEqual('1,000');
    expect(calculationParser('28000+100000')).toEqual('128,000');
  });
  it('deals with border cases', () => {
    expect(calculationParser('2+')).toEqual('2');
    expect(calculationParser('2+(')).toEqual('2');
  });
  it('follows order of operations ('*' is calculated before '+' etc)', () => {
    expect(calculationParser('2+22*5')).toEqual('112');
  });
});

describe('calculateOuter', () => {
  it('returns input unchanged if there are no operators', () => {
    expect(calculateOuter('54667546')).toEqual('54,667,546');
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
    expect(calculateSimple('', '5', '+', '5')).toEqual(10);
  });
  it('subtracts the second number from the first', () => {
    expect(calculateSimple('', '10', '-', '5')).toEqual(5);
  });
  it('divides the first number by the second', () => {
    expect(calculateSimple('', '10', '/', '5')).toEqual(2);
  });
  it('multiplies the first number by the second', () => {
    expect(calculateSimple('', '10', '*', '5')).toEqual(50);
  });
  // it('return number in exponential notation if its longer than 15 digits before decimal point', () => {
  //   expect(calculateSimple('', '999999999999999', '+', '1')).toEqual('1.00000000e+15');
  // });
});
