import '../../src/index';

describe('Array.repeat', () => {
    it('should repeat a string value', () => {
        expect(Array.repeatLinq('x', 3)).toEqual(['x', 'x', 'x']);
    });

    it('should repeat a number value', () => {
        expect(Array.repeatLinq(7, 4)).toEqual([7, 7, 7, 7]);
    });

    it('should repeat a boolean value', () => {
        expect(Array.repeatLinq(true, 2)).toEqual([true, true]);
    });

    it('should return empty array when count is 0', () => {
        expect(Array.repeatLinq('test', 0)).toEqual([]);
    });

    it('should throw error if count is negative', () => {
        expect(() => Array.repeatLinq('x', -1)).toThrow('Count must be non-negative');
    });

    it('should repeat object references', () => {
        const obj = { id: 1 };
        const result = Array.repeatLinq(obj, 2);
        expect(result).toEqual([obj, obj]);
        expect(result[0]).toBe(result[1]); // Same reference
    });
});
