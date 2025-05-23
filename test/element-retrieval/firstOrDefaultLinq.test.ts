import { addFirstOrDefaultLinq } from '../../src/methods/element-retrieval/firstOrDefaultLinq';

beforeAll(() => {
    addFirstOrDefaultLinq();
});

describe('firstOrDefault', () => {
    it('should return the first element in a non-empty array', () => {
        const arr = [1, 2, 3];
        expect(arr.firstOrDefaultLinq()).toBe(1);
    });

    it('should return the default value for an empty array', () => {
        const arr: number[] = [];
        expect(arr.firstOrDefaultLinq(undefined, 42)).toBe(42);
    });

    it('should return undefined for empty array if no default is provided', () => {
        const arr: number[] = [];
        expect(arr.firstOrDefaultLinq()).toBeUndefined();
    });

    it('should return the first matching element based on predicate', () => {
        const arr = [1, 2, 3, 4];
        expect(arr.firstOrDefaultLinq(x => x > 2)).toBe(3);
    });

    it('should return the default value if no element matches the predicate', () => {
        const arr = [1, 2, 3];
        expect(arr.firstOrDefaultLinq(x => x > 10, 99)).toBe(99);
    });

    it('should work with strings and predicate', () => {
        const arr = ['a', 'b', 'c'];
        expect(arr.firstOrDefaultLinq(x => x === 'd', 'default')).toBe('default');
    });

    it('should work with complex objects', () => {
        const arr = [{ id: 1 }, { id: 2 }];
        const defaultObj = { id: 999 };
        expect(arr.firstOrDefaultLinq(x => x.id === 3, defaultObj)).toBe(defaultObj);
    });
});