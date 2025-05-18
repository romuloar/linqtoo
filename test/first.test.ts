import { addFirst } from '../src/methods/first';

beforeAll(() => {
  addFirst();
});

describe('Array.prototype.first', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.first).toBe('function');
  });

  test('returns the first element if no predicate is provided', () => {
    const arr = [10, 20, 30];
    expect(arr.first()).toBe(10);
  });

  test('throws an error if the array is empty and no predicate is provided', () => {
    const arr: number[] = [];
    expect(() => arr.first()).toThrowError("Sequence contains no elements");
  });

  test('returns the first element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x > 3;
    expect(arr.first(predicate)).toBe(4);
  });

  test('throws an error if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3];
    const predicate = (x: number) => x > 10;
    expect(() => arr.first(predicate)).toThrowError("No element satisfies the condition");
  });

  test('works with predicate that matches first element', () => {
    const arr = [5, 6, 7];
    const predicate = (x: number) => x === 5;
    expect(arr.first(predicate)).toBe(5);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.first();
    expect(arr).toEqual(copy);
  });
});