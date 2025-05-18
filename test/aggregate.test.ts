import { addAggregate } from '../src/methods/aggregate';

beforeAll(() => {
  addAggregate();
});

describe('Array.prototype.aggregate', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.aggregate).toBe('function');
  });

  test('aggregates values with sum function', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.aggregate((acc, item) => acc + item, 0);
    expect(result).toBe(10);
  });

  test('aggregates values with product function', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.aggregate((acc, item) => acc * item, 1);
    expect(result).toBe(24);
  });

  test('aggregates with string concatenation', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.aggregate((acc, item) => acc + item, '');
    expect(result).toBe('abc');
  });

  test('returns seed if array is empty', () => {
    const arr: number[] = [];
    const result = arr.aggregate((acc, item) => acc + item, 100);
    expect(result).toBe(100);
  });

  test('works with objects and accumulator as object', () => {
    const arr = [{ count: 1 }, { count: 2 }, { count: 3 }];
    const result = arr.aggregate(
      (acc, item) => ({ count: acc.count + item.count }),
      { count: 0 }
    );
    expect(result).toEqual({ count: 6 });
  });
});
