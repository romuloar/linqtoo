import '../src/index'; // importa para garantir que selectMany foi registrado

describe('Array.prototype.selectMany', () => {
  test('returns empty array when called on empty array', () => {
    const arr: number[] = [];
    const result = arr.selectMany(x => [x * 2]);
    expect(result).toEqual([]);
  });

  test('flattens arrays returned by selector', () => {
    const arr = [1, 2, 3];
    const result = arr.selectMany(x => [x, x * 10]);
    expect(result).toEqual([1, 10, 2, 20, 3, 30]);
  });

  test('works with arrays of strings', () => {
    const arr = ['a', 'bb', 'ccc'];
    const result = arr.selectMany(s => s.split(''));
    expect(result).toEqual(['a', 'b', 'b', 'c', 'c', 'c']);
  });

  test('handles empty arrays returned by selector', () => {
    const arr = [1, 2, 3];
    const result = arr.selectMany(x => x % 2 === 0 ? [x] : []);
    expect(result).toEqual([2]);
  });
});