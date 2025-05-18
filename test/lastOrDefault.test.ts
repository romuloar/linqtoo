import { addLastOrDefault } from '../src/methods/lastOrDefault';

beforeAll(() => {
  addLastOrDefault();
});

describe('Array.prototype.lastOrDefault', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.lastOrDefault).toBe('function');
  });

  test('returns null if array is empty and no predicate is provided', () => {
    const arr: number[] = [];
    expect(arr.lastOrDefault()).toBeNull();
  });

  test('returns the last element if no predicate is provided', () => {
    const arr = [10, 20, 30];
    expect(arr.lastOrDefault()).toBe(30);
  });

  test('returns the last element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x < 4;
    expect(arr.lastOrDefault(predicate)).toBe(3);
  });

  test('returns null if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3];
    const predicate = (x: number) => x > 10;
    expect(arr.lastOrDefault(predicate)).toBeNull();
  });

  test('works with predicate that matches the last element', () => {
    const arr = [5, 6, 7];
    const predicate = (x: number) => x === 7;
    expect(arr.lastOrDefault(predicate)).toBe(7);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.lastOrDefault();
    expect(arr).toEqual(copy);
  });
});