import { addSumLinq } from '../../src/methods/aggregation-quantifiers/sumLinq';

// Extend Array interface globally for TypeScript
declare global {
  interface Array<T> {
    sumLinq(selector?: (item: T) => number): number;
  }
}

beforeAll(() => {
    addSumLinq();
});

describe('Array.prototype.sum', () => {
  test('method is added to Array prototype', () => {
      expect(typeof Array.prototype.sumLinq).toBe('function');
  });

  test('returns 0 for empty array', () => {
      expect([].sumLinq()).toBe(0);
  });

  test('sums numbers in array without selector', () => {
    const arr = [1, 2, 3, 4, 5];
      expect(arr.sumLinq()).toBe(15);
  });

  test('sums using selector function', () => {
    const arr = [{ val: 2 }, { val: 3 }, { val: 5 }];
      expect(arr.sumLinq(x => x.val)).toBe(10);
  });

  test('sums correctly with negative numbers using selector', () => {
    const arr = [{ val: -1 }, { val: 4 }, { val: -3 }];
      expect(arr.sumLinq(x => x.val)).toBe(0);
  });

  test('sums correctly with one element', () => {
      expect([42].sumLinq()).toBe(42);
  });

  test('sums correctly with mixed types', () => {
    const arr = [1, '2', 3, '4'];
      expect(arr.sumLinq(x => Number(x))).toBe(10);
  });

  test('sums correctly with complex objects', () => {
    const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
      expect(arr.sumLinq(x => x.a)).toBe(6);
  });

  test('sums correctly with decimal numbers', () => {
    const arr = [1.5, 2.5, 3.5];
      expect(arr.sumLinq()).toBe(7.5);
  });

  test('sums correctly with large numbers', () => {
    const arr = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
      expect(arr.sumLinq()).toBe(Number.MAX_SAFE_INTEGER * 2);
  });

  test('sums correctly with mixed number types', () => {
    const arr = [1, 2.5, 3];
      expect(arr.sumLinq()).toBe(6.5);
  });

  test('sums correctly with boolean values', () => {
    const arr = [true, false, true];
      expect(arr.sumLinq(x => (x ? 1 : 0))).toBe(2);
  });
});
