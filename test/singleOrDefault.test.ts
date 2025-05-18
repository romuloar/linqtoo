import { addSingleOrDefault } from '../src/methods/singleOrDefault';

beforeAll(() => {
  addSingleOrDefault();
});

describe('Array.prototype.singleOrDefault', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.singleOrDefault).toBe('function');
  });

  test('returns null if array is empty and no predicate is provided', () => {
    const arr: number[] = [];
    expect(arr.singleOrDefault()).toBeNull();
  });

  test('returns the single element if array has exactly one element and no predicate is provided', () => {
    const arr = [42];
    expect(arr.singleOrDefault()).toBe(42);
  });

  test('returns null if array has more than one element and no predicate is provided', () => {
    const arr = [1, 2];
    expect(arr.singleOrDefault()).toBeNull();
  });

  test('returns null if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3];
    expect(arr.singleOrDefault(x => x > 10)).toBeNull();
  });

  test('returns null if more than one element satisfy the predicate', () => {
    const arr = [2, 4, 6];
    expect(arr.singleOrDefault(x => x % 2 === 0)).toBeNull();
  });

  test('returns the single element that satisfies the predicate', () => {
    const arr = [1, 2, 3];
    expect(arr.singleOrDefault(x => x === 2)).toBe(2);
  });

  test('returns null if predicate matches multiple elements', () => {
    const arr = [1, 2, 2, 3];
    expect(arr.singleOrDefault(x => x === 2)).toBeNull();
  });
});
