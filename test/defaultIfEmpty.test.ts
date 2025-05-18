import { addDefaultIfEmpty } from '../src/methods/defaultIfEmpty';

describe('Array.prototype.defaultIfEmpty', () => {
  beforeAll(() => {
    addDefaultIfEmpty();
  });

  test('should return the original array if it is not empty', () => {
    const arr = [1, 2, 3];
    const result = arr.defaultIfEmpty();
    expect(result).toEqual([1, 2, 3]);
  });

  test('should return an array with the default value if the original array is empty', () => {
    const arr: number[] = [];
    const result = arr.defaultIfEmpty(42);
    expect(result).toEqual([42]);
  });

  test('should return an array with null if the array is empty and no default value is provided', () => {
    const arr: string[] = [];
    const result = arr.defaultIfEmpty();
    expect(result).toEqual([null]);
  });

  test('should not modify the original array', () => {
    const arr = [10];
    const result = arr.defaultIfEmpty(0);
    expect(result).toEqual([10]);
    expect(arr).toEqual([10]);
  });
});
