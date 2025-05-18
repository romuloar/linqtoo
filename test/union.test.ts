import { addUnion } from '../src/methods/union';

beforeAll(() => {
  addUnion();
});

describe('Array.prototype.union', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.union).toBe('function');
  });

  test('returns union of two arrays without duplicates when no comparer provided', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    const result = arr1.union(arr2);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('returns copy of first array when second array is empty', () => {
    const arr1 = [1, 2, 3];
    const arr2: number[] = [];
    const result = arr1.union(arr2);
    expect(result).toEqual(arr1);
  });

  test('returns copy of second array when first array is empty', () => {
    const arr1: number[] = [];
    const arr2 = [4, 5];
    const result = arr1.union(arr2);
    expect(result).toEqual([4, 5]);
  });

  test('returns union with custom comparer', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 2 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr1.union(arr2, comparer);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  test('does not add duplicates with custom comparer', () => {
    const arr1 = [{ id: 1 }];
    const arr2 = [{ id: 1 }, { id: 1 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr1.union(arr2, comparer);
    expect(result).toEqual([{ id: 1 }]);
  });

  test('returns first array if second array is empty even with comparer', () => {
    const arr1 = [1, 2];
    const arr2: number[] = [];
    const comparer = (a: number, b: number) => a === b;
    const result = arr1.union(arr2, comparer);
    expect(result).toEqual(arr1);
  });

  test('returns combined arrays if no duplicates detected by comparer', () => {
    const arr1 = [{ id: 1 }];
    const arr2 = [{ id: 2 }];
    const comparer = (a: { id: number }, b: { id: number }) => false; // always false: no duplicates
    const result = arr1.union(arr2, comparer);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
