import { addElementAtOrDefaultLinq } from '../../src/methods/element-retrieval/elementAtOrDefaultLinq';

beforeAll(() => {
    addElementAtOrDefaultLinq();
});

describe('elementAtOrDefault', () => {
    it('should return the element at the specified index', () => {
        const arr = ['a', 'b', 'c'];
        expect(arr.elementAtOrDefaultLinq(0)).toBe('a');
        expect(arr.elementAtOrDefaultLinq(1)).toBe('b');
        expect(arr.elementAtOrDefaultLinq(2)).toBe('c');
    });

    it('should return the default value for negative index', () => {
        const arr = [1, 2, 3];
        expect(arr.elementAtOrDefaultLinq(-1, 99)).toBe(99);
    });

    it('should return the default value for index greater than or equal to length', () => {
        const arr = [1, 2, 3];
        expect(arr.elementAtOrDefaultLinq(3, 99)).toBe(99);
        expect(arr.elementAtOrDefaultLinq(10, 50)).toBe(50);
    });

    it('should return undefined if no default value provided and index out of range', () => {
        const arr = [1, 2, 3];
        expect(arr.elementAtOrDefaultLinq(5)).toBeUndefined();
    });

    it('should work with empty arrays', () => {
        const arr: number[] = [];
        expect(arr.elementAtOrDefaultLinq(0)).toBeUndefined();
        expect(arr.elementAtOrDefaultLinq(0, 123)).toBe(123);
    });
});
