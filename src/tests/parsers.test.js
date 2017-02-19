import {
  maxNumberLength,
  maxDecimalDotLength,
  maxCharacterNumber,
  parseInput,
  deleteInput } from '../utils/parsers';

describe('maxNumberLength', () => {
  it('does not allow more than 15 digits per number', () => {
    expect(maxNumberLength('123456789012345')).toBeTruthy();
    expect(maxNumberLength('123456789.12345')).toBeTruthy();
    expect(maxNumberLength('5+123456789012345')).toBeTruthy();
    expect(maxNumberLength('5')).toBeFalsy();
    expect(maxNumberLength('12345678901234')).toBeFalsy();
    expect(maxNumberLength('5+12345678901234')).toBeFalsy();
  });
});

describe('maxDecimalDotLength', () => {
  it('does not allow more than 10 digits after decimal dot', () => {
    expect(maxDecimalDotLength('.1234567890')).toBeTruthy();
    expect(maxDecimalDotLength('12.1234567890')).toBeTruthy();
    expect(maxDecimalDotLength('77+12.1234567890')).toBeTruthy();
    expect(maxDecimalDotLength('12.12345')).toBeFalsy();
  });
});

describe('maxCharacterNumber', () => {
  it('does not allow more than 100 characters total', () => {
    expect(maxCharacterNumber('.1234567890')).toBeFalsy();
    expect(maxCharacterNumber('1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+1234+')).toBeTruthy();
  });
});

describe('parseInput', () => {
  it('removes redundant leading zeroes', () => {
    expect(parseInput('0', '0')).toEqual('0');
    expect(parseInput('0', '6')).toEqual('6');
    expect(parseInput('6.0', '0')).toEqual('6.00');
    expect(parseInput('66+0', '6')).toEqual('66+6');
  });
  it('inserts zero before the leading decimal dot', () => {
    expect(parseInput('', '.')).toEqual('0.');
    expect(parseInput('6563+0.34/', '.')).toEqual('6563+0.34/0.');
  });
  it('allows only one decimal dot per number', () => {
    expect(parseInput('0.34', '.')).toEqual('0.34');
    expect(parseInput('6563+0.34/434.', '.')).toEqual('6563+0.34/434.');
  });
  it('does not allow leading operators', () => {
    expect(parseInput('', '+')).toEqual('');
    expect(parseInput('', '-')).toEqual('');
    expect(parseInput('', '/')).toEqual('');
    expect(parseInput('', '*')).toEqual('');
  });
  it('does not allow more than one consecutive operator', () => {
    expect(parseInput('4+', '-')).toEqual('4-');
    expect(parseInput('4-', '+')).toEqual('4+');
    expect(parseInput('4*', '-')).toEqual('4-');
    expect(parseInput('4/', '-')).toEqual('4-');
    expect(parseInput('4+', '*')).toEqual('4*');
    expect(parseInput('4+', '/')).toEqual('4/');
  });
  it('inserts a leading opening bracket', () => {
    expect(parseInput('', '()')).toEqual('(');
  });
  it('inserts "(" after an opening bracket', () => {
    expect(parseInput('(', '()')).toEqual('((');
    expect(parseInput('((((', '()')).toEqual('(((((');
  });
  it('inserts ")" after a number if there are unclosed open brackets', () => {
    expect(parseInput('(67', '()')).toEqual('(67)');
    expect(parseInput('((67', '()')).toEqual('((67)');
    expect(parseInput('(55*(66', '()')).toEqual('(55*(66)');
    expect(parseInput('(55.', '()')).toEqual('(55.)');
  });
  it('inserts "*(" after a number/closing bracket if there are no unclosed open brackets', () => {
    expect(parseInput('67', '()')).toEqual('67*(');
    expect(parseInput('67.', '()')).toEqual('67.*(');
    expect(parseInput('(67)', '()')).toEqual('(67)*(');
  });
  it('inserts "(-" when "+/-" button is pressed when input is empty', () => {
    expect(parseInput('', '+/-')).toEqual('(-');
  });
  it('removes "(-" if present when "+/-" button is pressed when input is empty', () => {
    expect(parseInput('(-', '+/-')).toEqual('');
  });
  it('inserts "(-" before a number when "+/-" button is pressed', () => {
    expect(parseInput('100', '+/-')).toEqual('(-100');
    expect(parseInput('55+55', '+/-')).toEqual('55+(-55');
  });
  it('removes "(-" before a number when "+/-" button is pressed', () => {
    expect(parseInput('(-100', '+/-')).toEqual('100');
    expect(parseInput('55+(-55', '+/-')).toEqual('55+55');
  });
  it('inserts "(" after an operator', () => {
    expect(parseInput('2*', '()')).toEqual('2*(');
    expect(parseInput('2/', '()')).toEqual('2/(');
    expect(parseInput('2-', '()')).toEqual('2-(');
    expect(parseInput('2+', '()')).toEqual('2+(');
  });
  it('does not allow operators (except for "-") after "("', () => {
    expect(parseInput('(', '+')).toEqual('(');
    expect(parseInput('(', '*')).toEqual('(');
    expect(parseInput('(', '/')).toEqual('(');
    expect(parseInput('(', '-')).toEqual('(-');
  });
  it('deals correctly with border cases (2)', () => {
    expect(parseInput('(2)*(2-3', '()')).toEqual('(2)*(2-3)');
  });
});

describe('deleteInput', () => {
  it('deletes the last character from input', () => {
    expect(deleteInput('67+232')).toEqual('67+23');
  });
});
