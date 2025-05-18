import { addOrderBy } from '../src/methods/orderBy';

describe('Array.prototype.orderBy', () => {	
  beforeAll(() => {
    addOrderBy();
  });
  test('orders numbers ascending', () => {
    const arr = [5, 3, 9, 1];
    const ordered = arr.orderBy(x => x);
    expect(ordered).toEqual([1, 3, 5, 9]);
    expect(arr).toEqual([5, 3, 9, 1]); // original array não deve ser alterado
  });

  test('orders strings ascending', () => {
    const arr = ['banana', 'apple', 'cherry'];
    const ordered = arr.orderBy(x => x);
    expect(ordered).toEqual(['apple', 'banana', 'cherry']);
  });

  test('orders objects by a numeric property', () => {
    const arr = [{id: 3}, {id: 1}, {id: 2}];
    const ordered = arr.orderBy(x => x.id);
    expect(ordered).toEqual([{id:1}, {id:2}, {id:3}]);
  });

  test('orders objects by a string property', () => {
    const arr = [{name: 'Z'}, {name: 'A'}, {name: 'M'}];
    const ordered = arr.orderBy(x => x.name);
    expect(ordered).toEqual([{name: 'A'}, {name: 'M'}, {name: 'Z'}]);
  });

  test('returns empty array when original array is empty', () => {
    const arr: number[] = [];
    const ordered = arr.orderBy(x => x);
    expect(ordered).toEqual([]);
  });

  test('works correctly with duplicate keys', () => {
    const arr = [ {id: 2}, {id: 1}, {id: 2} ];
    const ordered = arr.orderBy(x => x.id);
    expect(ordered).toEqual([{id: 1}, {id: 2}, {id: 2}]);
  });
});