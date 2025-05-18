import { addIntersect } from '../src/methods/intersect';

beforeAll(() => {
  addIntersect();
});

describe('Array.prototype.intersect', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.intersect).toBe('function');
  });

  test('returns empty array when intersecting with empty array', () => {
    const arr = [1, 2, 3];
    const result = arr.intersect([]);
    expect(result).toEqual([]);
  });

  test('returns empty array when original array is empty', () => {
    const arr: number[] = [];
    const result = arr.intersect([1, 2, 3]);
    expect(result).toEqual([]);
  });

  test('returns intersection without comparer', () => {
    const arr = [1, 2, 3, 4];
    const second = [3, 4, 5, 6];
    const result = arr.intersect(second);
    expect(result).toEqual([3, 4]);
  });

  test('does not include duplicates in result without comparer', () => {
    const arr = [1, 2, 2, 3];
    const second = [2, 3, 3];
    const result = arr.intersect(second);
    expect(result).toEqual([2, 3]);
  });

  test('returns intersection with comparer', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const second = [{ id: 2 }, { id: 4 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.intersect(second, comparer);
    expect(result).toEqual([{ id: 2 }, { id: 3 }]);
  });

  test('does not include duplicates in result with comparer', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }];
    const second = [{ id: 2 }, { id: 3 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.intersect(second, comparer);
    expect(result).toEqual([{ id: 2 }, { id: 3 }]);
  });

  test('returns empty array when no intersection with comparer', () => {
    const arr = [{ id: 1 }, { id: 5 }];
    const second = [{ id: 2 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.intersect(second, comparer);
    expect(result).toEqual([]);
  });
});
