import { addSum } from '../src/methods/sum';

beforeAll(() => {
  addSum();
});

describe('Array.prototype.sum', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.sum).toBe('function');
  });

  test('returns 0 for empty array', () => {
    expect([].sum()).toBe(0);
  });

  test('sums numbers in array without selector', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.sum()).toBe(15);
  });

  test('sums numeric strings in array without selector', () => {
    const arr = ['10', '20', '30'];
    expect(arr.sum()).toBe(60);
  });

  test('sums using selector function', () => {
    const arr = [{ val: 2 }, { val: 3 }, { val: 5 }];
    expect(arr.sum(x => x.val)).toBe(10);
  });

  test('sums correctly with negative numbers using selector', () => {
    const arr = [{ val: -1 }, { val: 4 }, { val: -3 }];
    expect(arr.sum(x => x.val)).toBe(0);
  });

  test('sums correctly with one element', () => {
    expect([42].sum()).toBe(42);
  });
});
