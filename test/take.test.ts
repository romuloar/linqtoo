import { addTake } from '../src/methods/take';

beforeAll(() => {
  addTake();
});

describe('Array.prototype.take', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.take).toBe('function');
  });

  test('takes the specified number of elements from the start', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.take(3)).toEqual([1, 2, 3]);
  });

  test('returns empty array if count is 0', () => {
    const arr = [1, 2, 3];
    expect(arr.take(0)).toEqual([]);
  });

  test('returns empty array if count is negative', () => {
    const arr = [1, 2, 3];
    expect(arr.take(-5)).toEqual([]);
  });

  test('returns full array if count is greater than array length', () => {
    const arr = [1, 2, 3];
    expect(arr.take(10)).toEqual([1, 2, 3]);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3, 4];
    const copy = [...arr];
    arr.take(2);
    expect(arr).toEqual(copy);
  });

  test('works with empty array', () => {
    const arr: number[] = [];
    expect(arr.take(2)).toEqual([]);
  });
});