import parseInput from '../utils/parsers';

describe('raw input parser', () => {
  it('removes redundant leading zeroes', () => {
    expect(parseInput('00')).toEqual('0');
    expect(parseInput('06')).toEqual('6');
  });

  it('inserts zero before the leading decimal dot', () => {
    expect(parseInput('.')).toEqual('0.');
    expect(parseInput('6563+0.34/.')).toEqual('6563+0.34/0.');
  });

  it('allows only one decimal dot per number', () => {
    expect(parseInput('0.34.')).toEqual('0.34');
    expect(parseInput('6563+0.34/434..')).toEqual('6563+0.34/434.');
  });

  it('does not allow leading operators', () => {
    expect(parseInput('+')).toEqual('');
    expect(parseInput('-')).toEqual('');
    expect(parseInput('/')).toEqual('');
    expect(parseInput('*')).toEqual('');
  });

  it('does not allow more than one consecutive operator', () => {
    expect(parseInput('4+-')).toEqual('4-');
    expect(parseInput('4-+')).toEqual('4+');
    expect(parseInput('4*-')).toEqual('4-');
    expect(parseInput('4/-')).toEqual('4-');
    expect(parseInput('4+*')).toEqual('4*');
    expect(parseInput('4+/')).toEqual('4/');
  });
});
