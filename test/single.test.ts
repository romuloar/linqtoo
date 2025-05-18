import { addSingle } from '../src/methods/single';

beforeAll(() => {
  addSingle();
});

describe('Array.prototype.single', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.single).toBe('function');
  });

  test('throws error if array is empty and no predicate is provided', () => {
    const arr: number[] = [];
    expect(() => arr.single()).toThrow("Sequence contains no elements");
  });

  test('throws error if array has more than one element and no predicate is provided', () => {
    const arr = [1, 2];
    expect(() => arr.single()).toThrow("Sequence contains more than one element");
  });

  test('returns the single element if array has exactly one element and no predicate is provided', () => {
    const arr = [42];
    expect(arr.single()).toBe(42);
  });

  test('throws error if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3];
    expect(() => arr.single(x => x > 10)).toThrow("No element satisfies the condition");
  });

  test('throws error if more than one element satisfy the predicate', () => {
    const arr = [2, 4, 6];
    expect(() => arr.single(x => x % 2 === 0)).toThrow("Sequence contains more than one matching element");
  });

  test('returns the single element that satisfies the predicate', () => {
    const arr = [1, 2, 3];
    expect(arr.single(x => x === 2)).toBe(2);
  });

  test('throws error if predicate matches multiple elements but array has more elements', () => {
    const arr = [1, 2, 2, 3];
    expect(() => arr.single(x => x === 2)).toThrow("Sequence contains more than one matching element");
  });
});