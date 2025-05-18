import { addMin } from '../src/methods/min';

beforeAll(() => {
  addMin();
});

describe('Array.prototype.min', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.min).toBe('function');
  });

  test('throws error on empty array', () => {
    expect(() => [].min()).toThrow("Sequence contains no elements");
  });

  test('returns minimum number from an array of numbers without selector', () => {
    const arr = [5, 3, 9, 1, 7];
    expect(arr.min()).toBe(1);
  });

  test('returns minimum number from an array of numeric strings without selector', () => {
    const arr = ['10', '20', '3', '5'];
    expect(arr.min()).toBe(3);
  });

  test('returns minimum number using selector function', () => {
    const arr = [{ val: 10 }, { val: 5 }, { val: 20 }];
    expect(arr.min(x => x.val)).toBe(5);
  });

  test('returns minimum number when selector returns negative numbers', () => {
    const arr = [{ val: -1 }, { val: -5 }, { val: 0 }];
    expect(arr.min(x => x.val)).toBe(-5);
  });

  test('returns correct minimum when array has one element', () => {
    const arr = [42];
    expect(arr.min()).toBe(42);
  });
});
