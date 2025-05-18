import { addOrderByDescending  } from '../src/methods/orderByDescending';

beforeAll(() => {
  addOrderByDescending();
});

describe('Array.prototype.orderByDescending', () => {
  test('orders numbers descending', () => {
    const arr = [5, 3, 9, 1];
    const ordered = arr.orderByDescending(x => x);
    expect(ordered).toEqual([9, 5, 3, 1]);
    expect(arr).toEqual([5, 3, 9, 1]); // array original não deve ser modificado
  });

  test('orders strings descending', () => {
    const arr = ['banana', 'apple', 'cherry'];
    const ordered = arr.orderByDescending(x => x);
    expect(ordered).toEqual(['cherry', 'banana', 'apple']);
  });

  test('orders objects by a numeric property descending', () => {
    const arr = [{id: 3}, {id: 1}, {id: 2}];
    const ordered = arr.orderByDescending(x => x.id);
    expect(ordered).toEqual([{id: 3}, {id: 2}, {id: 1}]);
  });

  test('orders objects by a string property descending', () => {
    const arr = [{name: 'Z'}, {name: 'A'}, {name: 'M'}];
    const ordered = arr.orderByDescending(x => x.name);
    expect(ordered).toEqual([{name: 'Z'}, {name: 'M'}, {name: 'A'}]);
  });

  test('returns empty array when original array is empty', () => {
    const arr: number[] = [];
    const ordered = arr.orderByDescending(x => x);
    expect(ordered).toEqual([]);
  });

  test('works correctly with duplicate keys', () => {
    const arr = [{id: 2}, {id: 1}, {id: 2}];
    const ordered = arr.orderByDescending(x => x.id);
    expect(ordered).toEqual([{id: 2}, {id: 2}, {id: 1}]);
  });
});