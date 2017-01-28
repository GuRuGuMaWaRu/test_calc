import parseInput from '../utils/parsers';

it('removes redundant zeroes from input', () => {
  expect(parseInput('001')).toEqual('1');
});
