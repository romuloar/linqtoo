import { addZip } from '../src/methods/zip';

describe('Array.prototype.zip', () => {
  beforeAll(() => {
    addZip();
  });

  test('should combine two arrays using the resultSelector', () => {
    const a = [1, 2, 3];
    const b = ['a', 'b', 'c'];
    const result = a.zip(b, (x, y) => `${x}${y}`);
    expect(result).toEqual(['1a', '2b', '3c']);
  });

  test('should zip up to the length of the shorter array', () => {
    const a = [1, 2, 3, 4];
    const b = ['x', 'y'];
    const result = a.zip(b, (x, y) => `${x}-${y}`);
    expect(result).toEqual(['1-x', '2-y']);
  });

  test('should return an empty array if either array is empty', () => {
    const a: number[] = [];
    const b = [1, 2, 3];
    const result = a.zip(b, (x, y) => x + y);
    expect(result).toEqual([]);
  });

  test('should work with complex resultSelector logic', () => {
    const a = [1, 2];
    const b = [10, 20];
    const result = a.zip(b, (x, y) => x * y);
    expect(result).toEqual([10, 40]);
  });
});
