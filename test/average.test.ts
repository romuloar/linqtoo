import { addSum } from '../src/methods/sum';
import { addAverage } from '../src/methods/average';

beforeAll(() => {
  addSum();     // necessário porque average usa sum internamente
  addAverage();
});

describe('Array.prototype.average', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.average).toBe('function');
  });

  test('throws error on empty array', () => {
    expect(() => [].average()).toThrow("Sequence contains no elements");
  });

  test('calculates average of numbers without selector', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.average()).toBe(3);
  });

  test('calculates average using selector function', () => {
    const arr = [{ val: 2 }, { val: 4 }, { val: 6 }];
    expect(arr.average(x => x.val)).toBe(4);
  });

  test('calculates average with negative numbers', () => {
    const arr = [-2, 0, 2];
    expect(arr.average()).toBe(0);
  });

  test('calculates average with one element', () => {
    expect([42].average()).toBe(42);
  });
});
