import '../../src/index';


describe('Array.prototype.prepend', () => {
    it('should add an element at the beginning of the array', () => {
        const result = [2, 3].prependLinq(1);
        expect(result).toEqual([1, 2, 3]);
    });

    it('should work with strings', () => {
        const result = ['b', 'c'].prependLinq('a');
        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should work with empty arrays', () => {
        const result = ([] as string[]).prependLinq('hello');
        expect(result).toEqual(['hello']);
    });

    it('should not mutate the original array', () => {
        const original = [1, 2, 3];
        const result = original.prependLinq(0);
        expect(original).toEqual([1, 2, 3]);
        expect(result).not.toBe(original); // new array
    });
});
