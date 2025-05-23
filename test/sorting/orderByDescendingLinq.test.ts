import { addOrderByDescendingLinq } from '../../src/methods/sorting/orderByDescendingLinq';

beforeAll(() => {
  addOrderByDescendingLinq();
});

describe('orderByDescendingLinq', () => {
    it('should sort numbers in descending order', () => {
        const arr = [1, 4, 2, 5, 3];
        const result = arr.orderByDescendingLinq(x => x);
        expect([...result]).toEqual([5, 4, 3, 2, 1]);
        expect([1, 4, 2, 5, 3]).toEqual([1, 4, 2, 5, 3]);
    });

    it('should sort objects by a numeric property in descending order', () => {
        const arr = [{ v: 2 }, { v: 1 }, { v: 3 }];
        const result = arr.orderByDescendingLinq(x => x.v);
        expect([...result]).toEqual([{ v: 3 }, { v: 2 }, { v: 1 }]);
    });

    it('should sort strings in descending order', () => {
        const arr = ['b', 'a', 'c'];
        const result = arr.orderByDescendingLinq(x => x);
        expect([...result]).toEqual(['c', 'b', 'a']);
    });

    it('should not mutate the original array', () => {
        const arr = [1, 2, 3];
        arr.orderByDescendingLinq(x => x);
        expect(arr).toEqual([1, 2, 3]);
    });

    it('should work with empty array', () => {
        const arr: number[] = [];
        const result = arr.orderByDescendingLinq(x => x);
        expect([...result]).toEqual([]);
    });

    it('should work with one element', () => {
        const arr = [42];
        const result = arr.orderByDescendingLinq(x => x);
        expect([...result]).toEqual([42]);
    });

    it('should sort by string property', () => {
        const arr = [{ name: 'Bob' }, { name: 'Alice' }, { name: 'Charlie' }];
        const result = arr.orderByDescendingLinq(x => x.name);
        expect([...result]).toEqual([
            { name: 'Charlie' },
            { name: 'Bob' },
            { name: 'Alice' }
        ]);
    });

    it('should handle null and undefined values', () => {
        const arr = [3, null, 1, undefined, 2];
        const result = arr.orderByDescendingLinq(x => x);
        expect([...result].slice(0, 3)).toEqual([3, 2, 1]);
        expect([undefined, null]).toContain([...result][3]);
        expect([undefined, null]).toContain([...result][4]);
        expect([...result][3]).not.toEqual([...result][4]);
    });

    it('should sort dates in descending order', () => {
        const arr = [
            new Date('2022-01-01'),
            new Date('2024-01-01'),
            new Date('2023-01-01')
        ];
        const result = arr.orderByDescendingLinq(x => x);
        expect([...result].map(d => d.getTime())).toEqual([
            new Date('2024-01-01').getTime(),
            new Date('2023-01-01').getTime(),
            new Date('2022-01-01').getTime()
        ]);
    });
});