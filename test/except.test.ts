import { addExcept } from '../src/methods/except';

beforeAll(() => {
  addExcept();
});

describe('Array.prototype.except', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.except).toBe('function');
  });

  test('returns full array when second is empty', () => {
    const arr = [1, 2, 3];
    const result = arr.except([]);
    expect(result).toEqual([1, 2, 3]);
  });

  test('returns empty array when original array is empty', () => {
    const arr: number[] = [];
    const result = arr.except([1, 2, 3]);
    expect(result).toEqual([]);
  });

  test('returns difference without comparer', () => {
    const arr = [1, 2, 3, 4];
    const second = [3, 4, 5];
    const result = arr.except(second);
    expect(result).toEqual([1, 2]);
  });

  test('does not include duplicates in result without comparer', () => {
    const arr = [1, 2, 2, 3];
    const second = [2, 4];
    const result = arr.except(second);
    expect(result).toEqual([1, 3]);
  });

  test('returns difference with comparer', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const second = [{ id: 2 }, { id: 4 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.except(second, comparer);
    expect(result).toEqual([{ id: 1 }, { id: 3 }]);
  });

  test('does not include duplicates in result with comparer', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 3 }];
    const second = [{ id: 2 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.except(second, comparer);
    expect(result).toEqual([{ id: 1 }, { id: 3 }]);
  });

  test('returns full array when no elements match second with comparer', () => {
    const arr = [{ id: 1 }, { id: 5 }];
    const second = [{ id: 2 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const result = arr.except(second, comparer);
    expect(result).toEqual([{ id: 1 }, { id: 5 }]);
  });
});
