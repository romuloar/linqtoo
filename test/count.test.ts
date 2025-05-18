import { addCount } from '../src/methods/count';

describe('Array.prototype.count', () => {
  beforeAll(() => {
    addCount();
  });

  test('should count all elements when no predicate is given', () => {
    const arr = [1, 2, 3, 4];
    expect(arr.count()).toBe(4);
  });

  test('should count elements matching predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const isEven = (x: number) => x % 2 === 0;
    expect(arr.count(isEven)).toBe(2); // 2 and 4
  });

  test('should return 0 when no elements match predicate', () => {
    const arr = [1, 3, 5];
    const isEven = (x: number) => x % 2 === 0;
    expect(arr.count(isEven)).toBe(0);
  });

  test('should return 0 for empty array with no predicate', () => {
    const arr: number[] = [];
    expect(arr.count()).toBe(0);
  });

  test('should return 0 for empty array with predicate', () => {
    const arr: number[] = [];
    const alwaysTrue = () => true;
    expect(arr.count(alwaysTrue)).toBe(0);
  });
});