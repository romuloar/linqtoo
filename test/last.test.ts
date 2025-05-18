import { addLast } from '../src/methods/last';

beforeAll(() => {
  addLast();
});

describe('Array.prototype.last', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.last).toBe('function');
  });

  test('returns the last element if no predicate is provided', () => {
    const arr = [10, 20, 30];
    expect(arr.last()).toBe(30);
  });

  test('throws error if array is empty and no predicate is provided', () => {
    const arr: number[] = [];
    expect(() => arr.last()).toThrow("Sequence contains no elements");
  });

  test('returns the last element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x < 4;
    expect(arr.last(predicate)).toBe(3);
  });

  test('throws error if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3];
    const predicate = (x: number) => x > 10;
    expect(() => arr.last(predicate)).toThrow("No element satisfies the condition");
  });

  test('works with predicate that matches the last element', () => {
    const arr = [5, 6, 7];
    const predicate = (x: number) => x === 7;
    expect(arr.last(predicate)).toBe(7);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.last();
    expect(arr).toEqual(copy);
  });
});