import '../src/index'; // para garantir que addWhere() foi chamado

describe('Array.prototype.where', () => {
  test('returns empty array when called on empty array', () => {
    const arr: number[] = [];
    const result = arr.where(x => x > 0);
    expect(result).toEqual([]);
  });

  test('filters elements that satisfy the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.where(x => x % 2 === 0);
    expect(result).toEqual([2, 4]);
  });

  test('passes index as second argument to predicate', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const result = arr.where((item, index) => index % 2 === 0);
    expect(result).toEqual(['a', 'c']);
  });

  test('works with array of objects', () => {
    const arr = [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true }
    ];
    const result = arr.where(obj => obj.active);
    expect(result).toEqual([
      { id: 1, active: true },
      { id: 3, active: true }
    ]);
  });
});