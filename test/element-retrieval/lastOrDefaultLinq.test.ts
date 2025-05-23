import { addLastOrDefaultLinq } from '../../src/methods/element-retrieval/lastOrDefaultLinq';

beforeAll(() => {
    addLastOrDefaultLinq();
});

describe('lastOrDefault', () => {
    it('should return the last element in a non-empty array', () => {
        const arr = [1, 2, 3];
        expect(arr.lastOrDefaultLinq()).toBe(3);
    });

    it('should return defaultValue for empty array if provided', () => {
        const arr: number[] = [];
        expect(arr.lastOrDefaultLinq(undefined, 99)).toBe(99);
    });

    it('should return undefined for empty array if defaultValue not provided', () => {
        const arr: number[] = [];
        expect(arr.lastOrDefaultLinq()).toBeUndefined();
    });

    it('should return the last element matching the predicate', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(arr.lastOrDefaultLinq(x => x % 2 === 0)).toBe(4);
    });

    it('should return defaultValue if no element matches the predicate', () => {
        const arr = [1, 3, 5];
        expect(arr.lastOrDefaultLinq(x => x % 2 === 0, 100)).toBe(100);
    });

    it('should return undefined if no match and defaultValue not provided', () => {
        const arr = [1, 3, 5];
        expect(arr.lastOrDefaultLinq(x => x % 2 === 0)).toBeUndefined();
    });

    it('should work with strings', () => {
        const arr = ['a', 'b', 'c'];
        expect(arr.lastOrDefaultLinq()).toBe('c');
        expect(arr.lastOrDefaultLinq(x => x === 'b')).toBe('b');
    });
});