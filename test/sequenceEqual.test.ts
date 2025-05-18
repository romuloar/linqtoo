import { addSequenceEqual } from '../src/methods/sequenceEqual';

beforeAll(() => {
  addSequenceEqual();
});

describe('Array.prototype.sequenceEqual', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.sequenceEqual).toBe('function');
  });

  test('returns true for two empty arrays', () => {
    expect([].sequenceEqual([])).toBe(true);
  });

  test('returns true for equal arrays without comparer', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(arr1.sequenceEqual(arr2)).toBe(true);
  });

  test('returns false for arrays with different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(arr1.sequenceEqual(arr2)).toBe(false);
  });

  test('returns false for arrays with same length but different elements', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(arr1.sequenceEqual(arr2)).toBe(false);
  });

  test('returns true for arrays equal by custom comparer', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 1 }, { id: 2 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    expect(arr1.sequenceEqual(arr2, comparer)).toBe(true);
  });

  test('returns false for arrays different by custom comparer', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 1 }, { id: 3 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;
    expect(arr1.sequenceEqual(arr2, comparer)).toBe(false);
  });

  test('returns true for arrays of strings without comparer', () => {
    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['a', 'b', 'c'];
    expect(arr1.sequenceEqual(arr2)).toBe(true);
  });

  test('returns false for arrays with same elements in different order', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];
    expect(arr1.sequenceEqual(arr2)).toBe(false);
  });
});
