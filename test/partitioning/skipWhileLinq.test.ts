import '../../src/index';


describe('skipWhileLinq', () => {
    it('should skip elements while condition is true and include the rest', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = arr.skipWhileLinq(x => x < 3);
        expect(result).toEqual([3, 4, 5]);
    });

    it('should return empty array if all elements satisfy the predicate', () => {
        const arr = [1, 2, 3];
        const result = arr.skipWhileLinq(x => x < 10);
        expect(result).toEqual([]);
    });

    it('should return the full array if no element satisfies the predicate', () => {
        const arr = [4, 5, 6];
        const result = arr.skipWhileLinq(x => x < 3);
        expect(result).toEqual([4, 5, 6]);
    });

    it('should work with an empty array', () => {
        const arr: number[] = [];
        const result = arr.skipWhileLinq(x => x < 3);
        expect(result).toEqual([]);
    });

    it('should provide index correctly to the predicate', () => {
        const arr = ['a', 'b', 'c', 'd'];
        const result = arr.skipWhileLinq((_, i) => i < 2);
        expect(result).toEqual(['c', 'd']);
    });
    it('should handle complex conditions', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = arr.skipWhileLinq((x, i) => x < 3 && i < 2);
        expect(result).toEqual([3, 4, 5]);
    });
    it('should skip no elements if the predicate is always false', () => {
        const arr = [1, 2, 3];
        const result = arr.skipWhileLinq(() => false);
        expect(result).toEqual([1, 2, 3]);
    });
});