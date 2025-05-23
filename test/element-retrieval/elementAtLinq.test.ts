import { addElementAtLinq } from '../../src/methods/element-retrieval/elementAtLinq';

beforeAll(() => {
    addElementAtLinq();
});

describe('elementAt', () => {
    it('should return the element at the specified index', () => {
        const arr = ['a', 'b', 'c'];
        expect(arr.elementAtLinq(0)).toBe('a');
        expect(arr.elementAtLinq(1)).toBe('b');
        expect(arr.elementAtLinq(2)).toBe('c');
    });

    it('should return undefined for negative index', () => {
        const arr = [1, 2, 3];
        expect(arr.elementAtLinq(-1)).toBeUndefined();
    });

    it('should return undefined for index greater than or equal to length', () => {
        const arr = [1, 2, 3];
        expect(arr.elementAtLinq(3)).toBeUndefined();
        expect(arr.elementAtLinq(10)).toBeUndefined();
    });

    it('should work with empty arrays', () => {
        const arr: number[] = [];
        expect(arr.elementAtLinq(0)).toBeUndefined();
    });
});
