import { addGroupBy } from '../src/methods/groupBy';

describe('Array.prototype.groupBy', () => {
  beforeAll(() => {
    addGroupBy();
  });

  test('groups items by a numeric key', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Carol' },
      { id: 3, name: 'Dave' },
    ];
    const groups = arr.groupBy(item => item.id);
    
    expect(groups).toHaveLength(3);

    const group1 = groups.find(g => g.key === 1);
    expect(group1).toBeDefined();
    expect(group1!.elements).toEqual([
      { id: 1, name: 'Alice' },
      { id: 1, name: 'Carol' },
    ]);

    const group2 = groups.find(g => g.key === 2);
    expect(group2).toBeDefined();
    expect(group2!.elements).toEqual([{ id: 2, name: 'Bob' }]);

    const group3 = groups.find(g => g.key === 3);
    expect(group3).toBeDefined();
    expect(group3!.elements).toEqual([{ id: 3, name: 'Dave' }]);
  });

  test('groups items by a string key', () => {
  const arr = ['apple', 'apricot', 'banana', 'blueberry', 'cherry'];
  const groups = arr.groupBy(item => item[0]); // group by first letter
  
  expect(groups).toHaveLength(3);

  const groupA = groups.find(g => g.key === 'a');
  expect(groupA).toBeDefined();
  expect(groupA!.elements).toEqual(['apple', 'apricot']);

  const groupB = groups.find(g => g.key === 'b');
  expect(groupB).toBeDefined();
  expect(groupB!.elements).toEqual(['banana', 'blueberry']);

  const groupC = groups.find(g => g.key === 'c');
  expect(groupC).toBeDefined();
  expect(groupC!.elements).toEqual(['cherry']);
});

  test('returns empty array if original array is empty', () => {
    const arr: number[] = [];
    const groups = arr.groupBy(x => x);
    expect(groups).toEqual([]);
  });

  test('works with boolean keys', () => {
    const arr = [1, 2, 3, 4, 5];
    const groups = arr.groupBy(n => n % 2 === 0); // even or odd groups
    
    expect(groups).toHaveLength(2);

    const evenGroup = groups.find(g => g.key === true);
    expect(evenGroup).toBeDefined();
    expect(evenGroup!.elements).toEqual([2, 4]);

    const oddGroup = groups.find(g => g.key === false);
    expect(oddGroup).toBeDefined();
    expect(oddGroup!.elements).toEqual([1, 3, 5]);
  });
});