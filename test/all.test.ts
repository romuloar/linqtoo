import '../src/index'; // importe o arquivo onde addAll() é chamado

describe('Array.prototype.all', () => {
  test('returns true for empty array', () => {
    const arr: number[] = [];
    expect(arr.all(x => x > 0)).toBe(true);
  });

  test('returns true if all elements satisfy the predicate', () => {
    const arr = [2, 4, 6, 8];
    expect(arr.all(x => x % 2 === 0)).toBe(true);
  });

  test('returns false if any element does not satisfy the predicate', () => {
    const arr = [1, 2, 3, 4];
    expect(arr.all(x => x > 1)).toBe(false);
  });

  test('works with array of strings', () => {
    const arr = ['apple', 'apricot', 'avocado'];
    expect(arr.all(s => s.startsWith('a'))).toBe(true);
  });
});