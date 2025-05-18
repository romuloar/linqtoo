import { addElementAtOrDefault } from '../src/methods/elementAtOrDefault';

describe('Array.prototype.elementAtOrDefault', () => {
  beforeAll(() => {
    addElementAtOrDefault();
  });

  test('should return the element at the given index', () => {
    const arr = ['a', 'b', 'c'];
    expect(arr.elementAtOrDefault(0)).toBe('a');
    expect(arr.elementAtOrDefault(1)).toBe('b');
    expect(arr.elementAtOrDefault(2)).toBe('c');
  });

  test('should return null if index is negative', () => {
    const arr = [1, 2, 3];
    expect(arr.elementAtOrDefault(-1)).toBeNull();
  });

  test('should return null if index is equal to array length', () => {
    const arr = [1, 2, 3];
    expect(arr.elementAtOrDefault(3)).toBeNull();
  });

  test('should return null if index is greater than array length', () => {
    const arr = [1, 2, 3];
    expect(arr.elementAtOrDefault(10)).toBeNull();
  });

  test('should return null when called on an empty array', () => {
    const arr: number[] = [];
    expect(arr.elementAtOrDefault(0)).toBeNull();
  });
});
