import { addReverseLt } from '../src/methods/reverseLt';

beforeAll(() => {
  addReverseLt();
});

describe('reverseLt', () => {
  it('should return a reversed array without modifying the original', () => {
    const original = [1, 2, 3];
    const result = original.reverseLt();

    expect(result).toEqual([3, 2, 1]);
    expect(original).toEqual([1, 2, 3]); // original remains unchanged
  });

  it('should return an empty array when the input is empty', () => {
    const result = [].reverseLt();
    expect(result).toEqual([]);
  });

  it('should work with arrays of strings or other types', () => {
    const original = ['a', 'b', 'c'];
    const result = original.reverseLt();
    expect(result).toEqual(['c', 'b', 'a']);
  });
});