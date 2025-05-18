import '../src/index'; // import to register the methods on Array.prototype

describe('Array.prototype.any', () => {
  test('returns false for empty array without predicate', () => {
    const arr: number[] = [];
    expect(arr.any()).toBe(false);
  });

  test('returns true for non-empty array without predicate', () => {
    const arr = [1, 2, 3];
    expect(arr.any()).toBe(true);
  });

  test('returns true if any item satisfies the predicate', () => {
    const arr = [1, 2, 3, 4];
    const hasEven = arr.any(n => n % 2 === 0);
    expect(hasEven).toBe(true);
  });

  test('returns false if no items satisfy the predicate', () => {
    const arr = [1, 3, 5];
    const hasEven = arr.any(n => n % 2 === 0);
    expect(hasEven).toBe(false);
  });

  test('works with array of strings and predicate', () => {
    const arr = ['apple', 'banana', 'cherry'];
    const hasWordWithA = arr.any(s => s.includes('a'));
    expect(hasWordWithA).toBe(true);
  });
});