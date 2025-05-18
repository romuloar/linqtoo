import { addElementAt } from '../src/methods/elementAt';

describe('Array.prototype.elementAt', () => {
  beforeAll(() => {
    addElementAt();
  });

  test('should return the element at the given index', () => {
    const arr = ['a', 'b', 'c'];
    expect(arr.elementAt(0)).toBe('a');
    expect(arr.elementAt(1)).toBe('b');
    expect(arr.elementAt(2)).toBe('c');
  });

  test('should throw an error if index is negative', () => {
    const arr = [1, 2, 3];
    expect(() => arr.elementAt(-1)).toThrowError('Index was out of range');
  });

  test('should throw an error if index is equal to array length', () => {
    const arr = [1, 2, 3];
    expect(() => arr.elementAt(3)).toThrowError('Index was out of range');
  });

  test('should throw an error if index is greater than array length', () => {
    const arr = [1, 2, 3];
    expect(() => arr.elementAt(10)).toThrowError('Index was out of range');
  });

  test('should throw an error when called on an empty array', () => {
    const arr: number[] = [];
    expect(() => arr.elementAt(0)).toThrowError('Index was out of range');
  });
});
