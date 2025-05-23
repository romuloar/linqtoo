import { addDefaultIfEmptyLinq } from '../../src/methods/other-utilities/defaultIfEmptyLinq';

beforeAll(() => {
    addDefaultIfEmptyLinq();
});

describe('defaultIfEmptyLinq', () => {
    it('should return the original array if not empty', () => {
        const arr = [1, 2, 3];
        expect(arr.defaultIfEmptyLinq(0)).toEqual([1, 2, 3]);
    });

    it('should return default value if array is empty', () => {
        const arr: number[] = [];
        expect(arr.defaultIfEmptyLinq(42)).toEqual([42]);
    });

    it('should work with strings', () => {
        const arr: string[] = [];
        expect(arr.defaultIfEmptyLinq('default')).toEqual(['default']);
    });

    it('should not modify the original array', () => {
        const arr1: number[] = [];
        const arr2 = [10];
        const result1 = arr1.defaultIfEmptyLinq(99);
        const result2 = arr2.defaultIfEmptyLinq(99);
        expect(result1).not.toBe(arr1); // Should be a new reference when empty
        expect(result2).toBe(arr2);     // Should be the same reference when not empty
    });
});
