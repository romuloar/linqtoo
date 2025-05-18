import { addFirstOrDefault } from '../src/methods/firstOrDefault';

beforeAll(() => {
  addFirstOrDefault();
});

describe('Array.prototype.firstOrDefault', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.firstOrDefault).toBe('function');
  });

  test('returns the first element if no predicate is provided', () => {
    const arr = [10, 20, 30];
    expect(arr.firstOrDefault()).toBe(10);
  });

  test('returns null if the array is empty and no predicate is provided', () => {
    const arr: number[] = [];
    expect(arr.firstOrDefault()).toBeNull();
  });

  test('returns the first element that satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x > 3;
    expect(arr.firstOrDefault(predicate)).toBe(4);
  });

  test('returns null if no elements satisfy the predicate', () => {
    const arr = [1, 2, 3];
    const predicate = (x: number) => x > 10;
    expect(arr.firstOrDefault(predicate)).toBeNull();
  });

  test('works with predicate that matches first element', () => {
    const arr = [5, 6, 7];
    const predicate = (x: number) => x === 5;
    expect(arr.firstOrDefault(predicate)).toBe(5);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.firstOrDefault();
    expect(arr).toEqual(copy);
  });
});