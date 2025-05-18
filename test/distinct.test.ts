import { addDistinct } from '../src/methods/distinct';

beforeAll(() => {
  addDistinct();
});

describe('Array.prototype.distinct', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.distinct).toBe('function');
  });

  test('returns empty array when called on empty array', () => {
    const arr: number[] = [];
    expect(arr.distinct()).toEqual([]);
  });

  test('returns array without duplicates when no comparer provided', () => {
    const arr = [1, 2, 2, 3, 1];
    const result = arr.distinct();
    expect(result).toEqual([1, 2, 3]);
  });

  test('returns array unchanged when no duplicates', () => {
    const arr = [1, 2, 3];
    expect(arr.distinct()).toEqual([1, 2, 3]);
  });

  test('returns distinct objects with custom comparer', () => {
    const arr = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.distinct(comparer);
    expect(result).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]);
  });

  test('returns distinct when custom comparer always returns false (no duplicates)', () => {
    const arr = [1, 2, 3];
    const comparer = () => false;
    const result = arr.distinct(comparer);
    expect(result).toEqual([1, 2, 3]);
  });

  test('returns single element when all items equal by comparer', () => {
    const arr = [1, 1, 1, 1];
    const comparer = (a: number, b: number) => true; // all equal
    const result = arr.distinct(comparer);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(1);
  });
});
