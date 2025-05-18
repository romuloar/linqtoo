import '../src/index'; // importa para garantir que select foi registrado

describe('Array.prototype.select', () => {
  test('returns empty array when called on empty array', () => {
    const arr: number[] = [];
    const result = arr.select(x => x * 2);
    expect(result).toEqual([]);
  });

  test('projects each element according to selector', () => {
    const arr = [1, 2, 3];
    const result = arr.select(x => x * 3);
    expect(result).toEqual([3, 6, 9]);
  });

  test('passes index as second argument to selector', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.select((item, index) => `${index}-${item}`);
    expect(result).toEqual(['0-a', '1-b', '2-c']);
  });

  test('works with array of objects', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = arr.select(obj => obj.id);
    expect(result).toEqual([1, 2, 3]);
  });
});