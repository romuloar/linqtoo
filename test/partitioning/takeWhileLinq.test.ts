import '../../src/index';

describe('takeWhileLinq', () => {
    it('should take items while the predicate is true', () => {
        const result = [1, 2, 3, 0, 4].takeWhileLinq(n => n > 0);
        expect(result).toEqual([1, 2, 3]);
    });

    it('should return an empty array if the first item fails the predicate', () => {
        const result = [0, 1, 2].takeWhileLinq(n => n > 0);
        expect(result).toEqual([]);
    });

    it('should return the full array if all items match', () => {
        const result = [2, 4, 6].takeWhileLinq(n => n % 2 === 0);
        expect(result).toEqual([2, 4, 6]);
    });

    it('should pass the index to the predicate', () => {
        const result = ['a', 'b', 'c'].takeWhileLinq((_, i) => i < 2);
        expect(result).toEqual(['a', 'b']);
    });

    it('should return empty array for an empty input', () => {
        const result = [].takeWhileLinq(() => true);
        expect(result).toEqual([]);
    });
});