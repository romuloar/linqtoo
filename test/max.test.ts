import { addMax } from '../src/methods/max';

beforeAll(() => {
  addMax();
});

describe('Array.prototype.max', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.max).toBe('function');
  });

  test('throws error on empty array', () => {
    expect(() => [].max()).toThrow("Sequence contains no elements");
  });

  test('returns maximum number from an array of numbers without selector', () => {
    const arr = [5, 3, 9, 1, 7];
    expect(arr.max()).toBe(9);
  });

  test('returns maximum number from an array of numeric strings without selector', () => {
    const arr = ['10', '20', '3', '5'];
    expect(arr.max()).toBe(20);
  });

  test('returns maximum number using selector function', () => {
    const arr = [{ val: 10 }, { val: 5 }, { val: 20 }];
    expect(arr.max(x => x.val)).toBe(20);
  });

  test('returns maximum number when selector returns negative numbers', () => {
    const arr = [{ val: -1 }, { val: -5 }, { val: 0 }];
    expect(arr.max(x => x.val)).toBe(0);
  });

  test('returns correct maximum when array has one element', () => {
    const arr = [42];
    expect(arr.max()).toBe(42);
  });
});
