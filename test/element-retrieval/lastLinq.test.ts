import { addLastLinq } from '../../src/methods/element-retrieval/lastLinq';

beforeAll(() => {
    addLastLinq();
});

describe('last', () => {
    it('should return the last element in a non-empty array', () => {
        const arr = [1, 2, 3];
        expect(arr.lastLinq()).toBe(3);
    });

    it('should return undefined for an empty array', () => {
        const arr: number[] = [];
        expect(arr.lastLinq()).toBeUndefined();
    });

    it('should return the last element matching the predicate', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(arr.lastLinq(x => x % 2 === 0)).toBe(4); // last even number
    });

    it('should return undefined if no element matches the predicate', () => {
        const arr = [1, 3, 5];
        expect(arr.lastLinq(x => x % 2 === 0)).toBeUndefined();
    });

    it('should work with strings', () => {
        const arr = ['a', 'b', 'c'];
        expect(arr.lastLinq()).toBe('c');
        expect(arr.lastLinq(x => x === 'b')).toBe('b');
    });

    it('should work with complex objects', () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(arr.lastLinq(x => x.id < 3)).toEqual({ id: 2 });
    });
});