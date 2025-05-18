import '../linqtoo';

describe('LinqToo - Array Extension Methods', () => {
  // Dados de teste
  const numbers = [1, 2, 3, 4, 5];
  const people = [
    { id: 1, name: 'Alice', age: 25, department: 'IT' },
    { id: 2, name: 'Bob', age: 30, department: 'HR' },
    { id: 3, name: 'Charlie', age: 35, department: 'IT' },
    { id: 4, name: 'Diana', age: 40, department: 'Finance' },
    { id: 5, name: 'Eve', age: 22, department: 'HR' }
  ];
  const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5];

  describe('select', () => {
    it('should transform each element using the selector function', () => {
      const result = numbers.select(x => x * 2);
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    it('should provide index to the selector function', () => {
      const result = numbers.select((x, i) => x * i);
      expect(result).toEqual([0, 2, 6, 12, 20]);
    });
  });

  describe('selectMany', () => {
    it('should flatten nested arrays after transformation', () => {
      const nestedArrays = [[1, 2], [3, 4], [5, 6]];
      const result = nestedArrays.selectMany(x => x);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should work with custom selector', () => {
      const data = [
        { id: 1, tags: ['a', 'b'] },
        { id: 2, tags: ['c', 'd', 'e'] },
        { id: 3, tags: [] }
      ];
      const result = data.selectMany(x => x.tags);
      expect(result).toEqual(['a', 'b', 'c', 'd', 'e']);
    });
  });

  describe('where', () => {
    it('should filter elements based on predicate', () => {
      const result = numbers.where(x => x % 2 === 0);
      expect(result).toEqual([2, 4]);
    });

    it('should provide index to the predicate function', () => {
      const result = numbers.where((x, i) => i % 2 === 0);
      expect(result).toEqual([1, 3, 5]);
    });
  });

  describe('any', () => {
    it('should return true if at least one element matches predicate', () => {
      expect(numbers.any(x => x > 3)).toBe(true);
    });

    it('should return false if no elements match predicate', () => {
      expect(numbers.any(x => x > 10)).toBe(false);
    });

    it('should return true for non-empty array without predicate', () => {
      expect(numbers.any()).toBe(true);
    });

    it('should return false for empty array without predicate', () => {
      expect([].any()).toBe(false);
    });
  });

  describe('all', () => {
    it('should return true if all elements match predicate', () => {
      expect(numbers.all(x => x > 0)).toBe(true);
    });

    it('should return false if any element does not match predicate', () => {
      expect(numbers.all(x => x > 2)).toBe(false);
    });

    it('should return true for empty array', () => {
      expect([].all(x => x > 0)).toBe(true);
    });
  });

  describe('join', () => {
    it('should join two arrays based on key selectors', () => {
      const departments = [
        { id: 1, name: 'IT' },
        { id: 2, name: 'HR' },
        { id: 3, name: 'Finance' }
      ];

      const result = people.join(
        departments,
        person => person.department,
        dept => dept.name,
        (person, dept) => ({ name: person.name, department: dept.name })
      );

      expect(result).toEqual([
        { name: 'Alice', department: 'IT' },
        { name: 'Bob', department: 'HR' },
        { name: 'Charlie', department: 'IT' },
        { name: 'Diana', department: 'Finance' },
        { name: 'Eve', department: 'HR' }
      ]);
    });
  });

  describe('groupBy', () => {
    it('should group elements by key selector', () => {
      const result = people.groupBy(person => person.department);
      
      expect(result.length).toBe(3);
      
      // Find IT group
      const itGroup = result.find(g => g.key === 'IT');
      expect(itGroup).toBeDefined();
      expect(itGroup?.elements.length).toBe(2);
      expect(itGroup?.elements.map(p => p.name)).toEqual(['Alice', 'Charlie']);

      // Find HR group
      const hrGroup = result.find(g => g.key === 'HR');
      expect(hrGroup).toBeDefined();
      expect(hrGroup?.elements.length).toBe(2);
      expect(hrGroup?.elements.map(p => p.name)).toEqual(['Bob', 'Eve']);

      // Find Finance group
      const financeGroup = result.find(g => g.key === 'Finance');
      expect(financeGroup).toBeDefined();
      expect(financeGroup?.elements.length).toBe(1);
      expect(financeGroup?.elements.map(p => p.name)).toEqual(['Diana']);
    });
  });

  describe('orderBy', () => {
    it('should sort elements in ascending order by key', () => {
      const result = people.orderBy(p => p.age);
      expect(result.map(p => p.name)).toEqual(['Eve', 'Alice', 'Bob', 'Charlie', 'Diana']);
    });

    it('should work with primitive arrays', () => {
      const result = [3, 1, 5, 2, 4].orderBy(x => x);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('orderByDescending', () => {
    it('should sort elements in descending order by key', () => {
      const result = people.orderByDescending(p => p.age);
      expect(result.map(p => p.name)).toEqual(['Diana', 'Charlie', 'Bob', 'Alice', 'Eve']);
    });

    it('should work with primitive arrays', () => {
      const result = [3, 1, 5, 2, 4].orderByDescending(x => x);
      expect(result).toEqual([5, 4, 3, 2, 1]);
    });
  });

  // Note: thenBy and thenByDescending are placeholders in the implementation
  // and need a proper implementation before testing

  describe('skip', () => {
    it('should skip the specified number of elements', () => {
      const result = numbers.skip(2);
      expect(result).toEqual([3, 4, 5]);
    });

    it('should return all elements when count is zero or negative', () => {
      expect(numbers.skip(0)).toEqual([1, 2, 3, 4, 5]);
      expect(numbers.skip(-1)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return empty array when skipping more elements than exist', () => {
      expect(numbers.skip(10)).toEqual([]);
    });
  });

  describe('take', () => {
    it('should take the specified number of elements', () => {
      const result = numbers.take(3);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return empty array when count is zero or negative', () => {
      expect(numbers.take(0)).toEqual([]);
      expect(numbers.take(-1)).toEqual([]);
    });

    it('should return all elements when taking more elements than exist', () => {
      expect(numbers.take(10)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('first', () => {
    it('should return the first element without predicate', () => {
      expect(numbers.first()).toBe(1);
    });

    it('should return the first element matching the predicate', () => {
      expect(numbers.first(x => x > 2)).toBe(3);
    });

    it('should throw when array is empty', () => {
      expect(() => [].first()).toThrow('Sequence contains no elements');
    });

    it('should throw when no element matches the predicate', () => {
      expect(() => numbers.first(x => x > 10)).toThrow('No element satisfies the condition');
    });
  });

  describe('firstOrDefault', () => {
    it('should return the first element without predicate', () => {
      expect(numbers.firstOrDefault()).toBe(1);
    });

    it('should return the first element matching the predicate', () => {
      expect(numbers.firstOrDefault(x => x > 2)).toBe(3);
    });

    it('should return null when array is empty', () => {
      expect([].firstOrDefault()).toBeNull();
    });

    it('should return null when no element matches the predicate', () => {
      expect(numbers.firstOrDefault(x => x > 10)).toBeNull();
    });
  });

  describe('last', () => {
    it('should return the last element without predicate', () => {
      expect(numbers.last()).toBe(5);
    });

    it('should return the last element matching the predicate', () => {
      expect(numbers.last(x => x < 4)).toBe(3);
    });

    it('should throw when array is empty', () => {
      expect(() => [].last()).toThrow('Sequence contains no elements');
    });

    it('should throw when no element matches the predicate', () => {
      expect(() => numbers.last(x => x > 10)).toThrow('No element satisfies the condition');
    });
  });

  describe('lastOrDefault', () => {
    it('should return the last element without predicate', () => {
      expect(numbers.lastOrDefault()).toBe(5);
    });

    it('should return the last element matching the predicate', () => {
      expect(numbers.lastOrDefault(x => x < 4)).toBe(3);
    });

    it('should return null when array is empty', () => {
      expect([].lastOrDefault()).toBeNull();
    });

    it('should return null when no element matches the predicate', () => {
      expect(numbers.lastOrDefault(x => x > 10)).toBeNull();
    });
  });

  describe('single', () => {
    it('should return the only element in a single-element array', () => {
      expect([42].single()).toBe(42);
    });

    it('should throw when array is empty', () => {
      expect(() => [].single()).toThrow('Sequence contains no elements');
    });

    it('should throw when array has more than one element without predicate', () => {
      expect(() => numbers.single()).toThrow('Sequence contains more than one element');
    });

    it('should return the only element matching the predicate', () => {
      expect(numbers.single(x => x === 3)).toBe(3);
    });

    it('should throw when no element matches the predicate', () => {
      expect(() => numbers.single(x => x > 10)).toThrow('No element satisfies the condition');
    });

    it('should throw when multiple elements match the predicate', () => {
      expect(() => numbers.single(x => x > 2)).toThrow('Sequence contains more than one matching element');
    });
  });

  describe('singleOrDefault', () => {
    it('should return the only element in a single-element array', () => {
      expect([42].singleOrDefault()).toBe(42);
    });

    it('should return null when array is empty', () => {
      expect([].singleOrDefault()).toBeNull();
    });

    it('should return null when array has more than one element without predicate', () => {
      expect(numbers.singleOrDefault()).toBeNull();
    });

    it('should return the only element matching the predicate', () => {
      expect(numbers.singleOrDefault(x => x === 3)).toBe(3);
    });

    it('should return null when no element matches the predicate', () => {
      expect(numbers.singleOrDefault(x => x > 10)).toBeNull();
    });

    it('should return null when multiple elements match the predicate', () => {
      expect(numbers.singleOrDefault(x => x > 2)).toBeNull();
    });
  });

  describe('contains', () => {
    it('should return true when element exists in array', () => {
      expect(numbers.contains(3)).toBe(true);
    });

    it('should return false when element does not exist in array', () => {
      expect(numbers.contains(10)).toBe(false);
    });

    it('should work with custom comparer', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(items.contains({ id: 2 }, (a, b) => a.id === b.id)).toBe(true);
      expect(items.contains({ id: 4 }, (a, b) => a.id === b.id)).toBe(false);
    });
  });

  describe('intersect', () => {
    it('should return elements that exist in both arrays', () => {
      const result = [1, 2, 3].intersect([2, 3, 4]);
      expect(result).toEqual([2, 3]);
    });

    it('should return distinct elements', () => {
      const result = [1, 2, 2, 3].intersect([2, 2, 3, 4]);
      expect(result).toEqual([2, 3]);
    });

    it('should work with custom comparer', () => {
      const first = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const second = [{ id: 2 }, { id: 3 }, { id: 4 }];
      const result = first.intersect(second, (a, b) => a.id === b.id);
      expect(result.map(item => item.id)).toEqual([2, 3]);
    });
  });

  describe('except', () => {
    it('should return elements from first array not in second array', () => {
      const result = [1, 2, 3, 4].except([3, 4, 5]);
      expect(result).toEqual([1, 2]);
    });

    it('should return distinct elements', () => {
      const result = [1, 1, 2, 2, 3].except([3, 4, 5]);
      expect(result).toEqual([1, 2]);
    });

    it('should work with custom comparer', () => {
      const first = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const second = [{ id: 3 }, { id: 4 }, { id: 5 }];
      const result = first.except(second, (a, b) => a.id === b.id);
      expect(result.map(item => item.id)).toEqual([1, 2]);
    });
  });

  describe('distinct', () => {
    it('should return distinct elements', () => {
      const result = duplicateNumbers.distinct();
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should work with custom comparer', () => {
      const items = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 1, name: 'C' }, // Duplicate id
        { id: 3, name: 'D' }
      ];
      const result = items.distinct((a, b) => a.id === b.id);
      expect(result.length).toBe(3);
      expect(result.map(item => item.id).sort()).toEqual([1, 2, 3]);
    });
  });

  describe('union', () => {
    it('should combine elements from both arrays with no duplicates', () => {
      const result = [1, 2, 3].union([3, 4, 5]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should work with custom comparer', () => {
      const first = [{ id: 1 }, { id: 2 }];
      const second = [{ id: 2 }, { id: 3 }];
      const result = first.union(second, (a, b) => a.id === b.id);
      expect(result.map(item => item.id)).toEqual([1, 2, 3]);
    });
  });

  describe('sequenceEqual', () => {
    it('should return true for identical arrays', () => {
      expect([1, 2, 3].sequenceEqual([1, 2, 3])).toBe(true);
    });

    it('should return false for arrays with different elements', () => {
      expect([1, 2, 3].sequenceEqual([1, 2, 4])).toBe(false);
    });

    it('should return false for arrays with different lengths', () => {
      expect([1, 2, 3].sequenceEqual([1, 2])).toBe(false);
    });

    it('should work with custom comparer', () => {
      const first = [{ id: 1 }, { id: 2 }];
      const second = [{ id: 1 }, { id: 2 }];
      expect(first.sequenceEqual(second, (a, b) => a.id === b.id)).toBe(true);
      
      const third = [{ id: 1 }, { id: 3 }];
      expect(first.sequenceEqual(third, (a, b) => a.id === b.id)).toBe(false);
    });
  });

  describe('min', () => {
    it('should return the minimum value without selector', () => {
      expect([3, 1, 5, 2, 4].min()).toBe(1);
    });

    it('should throw for empty array', () => {
      expect(() => [].min()).toThrow('Sequence contains no elements');
    });

    it('should work with selector', () => {
      expect(people.min(p => p.age)).toBe(22);
    });
  });

  describe('max', () => {
    it('should return the maximum value without selector', () => {
      expect([3, 1, 5, 2, 4].max()).toBe(5);
    });

    it('should throw for empty array', () => {
      expect(() => [].max()).toThrow('Sequence contains no elements');
    });

    it('should work with selector', () => {
      expect(people.max(p => p.age)).toBe(40);
    });
  });

  describe('sum', () => {
    it('should return the sum of all values without selector', () => {
      expect([1, 2, 3, 4, 5].sum()).toBe(15);
    });

    it('should return zero for empty array', () => {
      expect([].sum()).toBe(0);
    });

    it('should work with selector', () => {
      expect(people.sum(p => p.age)).toBe(152);
    });
  });

  describe('average', () => {
    it('should return the average of all values without selector', () => {
      expect([1, 2, 3, 4, 5].average()).toBe(3);
    });

    it('should throw for empty array', () => {
      expect(() => [].average()).toThrow('Sequence contains no elements');
    });

    it('should work with selector', () => {
      expect(people.average(p => p.age)).toBe(30.4);
    });
  });

  describe('aggregate', () => {
    it('should aggregate values using accumulator function', () => {
      const result = numbers.aggregate((acc, val) => acc + val, 0);
      expect(result).toBe(15);
    });

    it('should work with non-number values', () => {
      const words = ['hello', 'world', 'linq', 'too'];
      const result = words.aggregate((acc, val) => acc + val.length, 0);
      expect(result).toBe(16);
    });

    it('should respect initial seed value', () => {
      const result = numbers.aggregate((acc, val) => acc + val, 10);
      expect(result).toBe(25);
    });
  });

  describe('reverse', () => {
    it('should reverse the order of elements', () => {
      const result = numbers.reverse();
      expect(result).toEqual([5, 4, 3, 2, 1]);
    });

    it('should not modify the original array', () => {
      const original = [1, 2, 3];
      const result = original.reverse();
      expect(result).toEqual([3, 2, 1]);
      expect(original).toEqual([1, 2, 3]);
    });
  });

  describe('count', () => {
    it('should return the length without predicate', () => {
      expect(numbers.count()).toBe(5);
    });

    it('should count elements matching predicate', () => {
      expect(numbers.count(x => x % 2 === 0)).toBe(2);
    });
  });

  describe('elementAt', () => {
    it('should return element at specified index', () => {
      expect(numbers.elementAt(2)).toBe(3);
    });

    it('should throw for negative index', () => {
      expect(() => numbers.elementAt(-1)).toThrow('Index was out of range');
    });

    it('should throw for index out of range', () => {
      expect(() => numbers.elementAt(10)).toThrow('Index was out of range');
    });
  });

  describe('elementAtOrDefault', () => {
    it('should return element at specified index', () => {
      expect(numbers.elementAtOrDefault(2)).toBe(3);
    });

    it('should return null for negative index', () => {
      expect(numbers.elementAtOrDefault(-1)).toBeNull();
    });

    it('should return null for index out of range', () => {
      expect(numbers.elementAtOrDefault(10)).toBeNull();
    });
  });

  // describe('defaultIfEmpty', () => {
    // it('should return original array if not empty', () => {
      // expect(numbers.defaultIfEmpty(99)).toEqual([1, 2, 3, 4, 5]);
    // });

    // it('should return array with default value if empty', () => {
      // expect([].defaultIfEmpty(99)).toEqual([99]);
    // });

    // it('should return array with null if empty and no default specified', () => {
      // expect([].defaultIfEmpty()).toEqual([null]);
    // });
  // });

  describe('zip', () => {
    it('should combine two arrays using selector', () => {
      const letters = ['a', 'b', 'c', 'd', 'e'];
      const result = numbers.zip(letters, (n, l) => `${l}${n}`);
      expect(result).toEqual(['a1', 'b2', 'c3', 'd4', 'e5']);
    });

    it('should use the length of the shorter array', () => {
      const shorter = [1, 2, 3];
      const result = numbers.zip(shorter, (a, b) => a + b);
      expect(result).toEqual([2, 4, 6]);
    });
  });

  describe('concat', () => {
    it('should concatenate two arrays', () => {
      const result = [1, 2, 3].concat([4, 5]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle multiple arrays', () => {
      const result = [1, 2].concat([3, 4], [5, 6]);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should not modify the original array', () => {
      const original = [1, 2, 3];
      const result = original.concat([4, 5]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(original).toEqual([1, 2, 3]);
    });
  });
});