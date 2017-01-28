import parseInput from '../utils/parsers';

it('removes redundant leading zeroes', () => {
  expect(parseInput('001')).toEqual('1');
});

it('inserts zero before the leading decimal dot', () => {
  expect(parseInput('.')).toEqual('0.');
});
