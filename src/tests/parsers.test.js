import parseInput from '../utils/parsers';

it('removes redundant leading zeroes', () => {
  expect(parseInput('001')).toEqual('1');
});
