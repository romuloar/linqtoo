import '../../src/index';

describe('Array.empty', () => {
    it('should return an empty array', () => {
        const result = Array.emptyLinq<number>();
        expect(result).toEqual([]);
        expect(result.length).toBe(0);
    });

    it('should work with different types', () => {
        const strings = Array.emptyLinq<string>();
        expect(strings).toEqual([]);

        const objects = Array.emptyLinq<{ id: number }>();
        expect(objects).toEqual([]);
    });
});