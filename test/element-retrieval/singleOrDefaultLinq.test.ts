import { addSingleOrDefaultLinq } from '../../src/methods/element-retrieval/singleOrDefaultLinq';

beforeAll(() => {
    addSingleOrDefaultLinq();
});

describe('singleOrDefault', () => {
    it('should return the single element if only one exists', () => {
        const arr = [1, 2, 3];
        expect(arr.singleOrDefaultLinq(x => x === 2)).toBe(2);
    });

    it('should return default value if none match', () => {
        const arr = [1, 2, 3];
        expect(arr.singleOrDefaultLinq(x => x === 5, 42)).toBe(42);
    });

    it('should return undefined if none match and no default provided', () => {
        const arr = [1, 2, 3];
        expect(arr.singleOrDefaultLinq(x => x === 5)).toBeUndefined();
    });

    it('should throw error if more than one element matches', () => {
        const arr = [1, 2, 2, 3];
        expect(() => arr.singleOrDefaultLinq(x => x === 2)).toThrow("More than one element satisfies the condition");
    });

    it('should work without predicate when there is only one element', () => {
        const arr = [42];
        expect(arr.singleOrDefaultLinq()).toBe(42);
    });

    it('should return default when empty and no predicate', () => {
        const arr: number[] = [];
        expect(arr.singleOrDefaultLinq(undefined, 99)).toBe(99);
    });

    it('should throw error if more than one element and no predicate', () => {
        const arr = [1, 2];
        expect(() => arr.singleOrDefaultLinq()).toThrow("More than one element satisfies the condition");
    });
});