import { addRangeLinq } from '../../src/methods/other-utilities/rangeLinq';

beforeAll(() => {
    addRangeLinq();
});

describe('Array.range', () => {
    it('should generate a range of numbers', () => {
        expect(Array.rangeLinq(0, 5)).toEqual([0, 1, 2, 3, 4]);
        expect(Array.rangeLinq(5, 3)).toEqual([5, 6, 7]);
        expect(Array.rangeLinq(-2, 4)).toEqual([-2, -1, 0, 1]);
    });

    it('should return an empty array when count is 0', () => {
        expect(Array.rangeLinq(10, 0)).toEqual([]);
    });

    it('should throw if count is negative', () => {
        expect(() => Array.rangeLinq(0, -1)).toThrow('Count must be non-negative.');
    });
});
