import { addContains } from '../src/methods/contains';

beforeAll(() => {
  addContains();
});

describe('Array.prototype.contains', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.contains).toBe('function');
  });

  test('returns false for empty array', () => {
    const arr: number[] = [];
    expect(arr.contains(1)).toBe(false);
  });

  test('returns true if element is in array without comparer', () => {
    const arr = [1, 2, 3];
    expect(arr.contains(2)).toBe(true);
  });

  test('returns false if element is not in array without comparer', () => {
    const arr = [1, 2, 3];
    expect(arr.contains(4)).toBe(false);
  });

  test('returns true if element is in array with comparer', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    expect(arr.contains({ id: 2 }, comparer)).toBe(true);
  });

  test('returns false if element is not in array with comparer', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    expect(arr.contains({ id: 4 }, comparer)).toBe(false);
  });

  test('returns true if comparer matches even with different object references', () => {
    const arr = [{ name: 'Alice' }, { name: 'Bob' }];
    const comparer = (a: { name: string }, b: { name: string }) => a.name === b.name;
    expect(arr.contains({ name: 'Bob' }, comparer)).toBe(true);
  });
});
