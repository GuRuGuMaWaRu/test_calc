import { parseInput, deleteInput, prepareInput } from '../utils/parsers';

describe('raw input parser', () => {
  it.skip('removes redundant leading zeroes', () => {
    expect(parseInput('0', '0')).toEqual('0');
    expect(parseInput('0', '6')).toEqual('6');
    expect(parseInput('6.0', '0')).toEqual('6.00');
    expect(parseInput('66+0', '6')).toEqual('66+6');
  });
  it.skip('inserts zero before the leading decimal dot', () => {
    expect(parseInput('', '.')).toEqual('0.');
    expect(parseInput('6563+0.34/', '.')).toEqual('6563+0.34/0.');
  });
  it.skip('allows only one decimal dot per number', () => {
    expect(parseInput('0.34', '.')).toEqual('0.34');
    expect(parseInput('6563+0.34/434.', '.')).toEqual('6563+0.34/434.');
  });
  it.skip('does not allow leading operators', () => {
    expect(parseInput('', '+')).toEqual('');
    expect(parseInput('', '-')).toEqual('');
    expect(parseInput('', '/')).toEqual('');
    expect(parseInput('', '*')).toEqual('');
  });
  it.skip('does not allow more than one consecutive operator', () => {
    expect(parseInput('4+', '-')).toEqual('4-');
    expect(parseInput('4-', '+')).toEqual('4+');
    expect(parseInput('4*', '-')).toEqual('4-');
    expect(parseInput('4/', '-')).toEqual('4-');
    expect(parseInput('4+', '*')).toEqual('4*');
    expect(parseInput('4+', '/')).toEqual('4/');
  });
  it.skip('inserts a leading opening bracket', () => {
    expect(parseInput('', '()')).toEqual('(');
  });
  it.skip('inserts an opening bracket after an opening bracket', () => {
    expect(parseInput('(', '()')).toEqual('((');
    expect(parseInput('((((', '()')).toEqual('(((((');
  });
  it.skip('inserts a closing bracket after a number if there are unclosed open brackets', () => {
    expect(parseInput('(67', '()')).toEqual('(67)');
    expect(parseInput('((67', '()')).toEqual('((67)');
    expect(parseInput('(55*(66', '()')).toEqual('(55*(66)');
    expect(parseInput('(55.', '()')).toEqual('(55.)');
  });
  it.skip('inserts an opening bracket and a multiplication operator after a number/closing bracket if there are no unclosed open brackets', () => {
    expect(parseInput('67', '()')).toEqual('67*(');
    expect(parseInput('67.', '()')).toEqual('67.*(');
    expect(parseInput('(67)', '()')).toEqual('(67)*(');
  });
  it('inserts "(-" if "+/-" button is pressed', () => {
    // expect(parseInput('', '+\-')).toEqual('(-');
    expect(parseInput('', '+/-')).toEqual('+/-');
  });
});

describe('deleteInput', () => {
  it('deletes last character from input', () => {
    expect(deleteInput('67+232')).toEqual('67+23');
  });
});

describe('prepareInput', () => {
  it('deletes the last character if it is one of the following "+-/*("', () => {
    expect(prepareInput('67+')).toEqual('67');
    expect(prepareInput('67+(')).toEqual('67+');
    expect(prepareInput('67-')).toEqual('67');
    expect(prepareInput('67/')).toEqual('67');
    expect(prepareInput('67*')).toEqual('67');
  })
})
