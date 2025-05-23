import { addAppendLinq } from '../../src/methods/other-utilities/appendLinq';

beforeAll(() => {
    addAppendLinq();
});

describe('append', () => {
    it('should append item to the end of the array', () => {
        const result = [1, 2, 3].appendLinq(4);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should work with empty array', () => {
        const result = ([] as string[]).appendLinq('a');
        expect(result).toEqual(['a']);
    });

    it('should not mutate the original array', () => {
        const original = [10, 20];
        const result = original.appendLinq(30);
        expect(original).toEqual([10, 20]);
        expect(result).not.toBe(original);
    });

    it('should work with objects', () => {
        const obj = { id: 1 };
        const result = [{ id: 2 }].appendLinq(obj);
        expect(result).toEqual([{ id: 2 }, { id: 1 }]);
    });
});
