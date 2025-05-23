import '../../src/index';

describe('Array.prototype.skip', () => {
  test('method is added to Array prototype', () => {
      expect(typeof Array.prototype.skipLinq).toBe('function');
  });

  test('skips the specified number of elements', () => {
    const arr = [1, 2, 3, 4, 5];
      expect(arr.skipLinq(2)).toEqual([3, 4, 5]);
  });

  test('returns the full array if count is 0', () => {
    const arr = [1, 2, 3];
      expect(arr.skipLinq(0)).toEqual([1, 2, 3]);
  });

  test('returns the full array if count is negative', () => {
    const arr = [1, 2, 3];
      expect(arr.skipLinq(-5)).toEqual([1, 2, 3]);
  });

  test('returns empty array if count is greater than array length', () => {
    const arr = [1, 2, 3];
      expect(arr.skipLinq(10)).toEqual([]);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3, 4];
    const copy = [...arr];
      arr.skipLinq(2);
    expect(arr).toEqual(copy);
  });

  test('works with empty array', () => {
    const arr: number[] = [];
      expect(arr.skipLinq(2)).toEqual([]);
  });
});