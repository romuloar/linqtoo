import '../../src/index';

describe('aggregate', () => {
    it('should sum numbers', () => {
        const arr = [1, 2, 3, 4];
        const result = arr.aggregateLinq(0, (acc, val) => acc + val);
        expect(result).toBe(10);
    });

    it('should concatenate strings', () => {
        const arr = ['a', 'b', 'c'];
        const result = arr.aggregateLinq('', (acc, val) => acc + val);
        expect(result).toBe('abc');
    });

    it('should return the seed for empty arrays', () => {
        const arr: number[] = [];
        const result = arr.aggregateLinq(100, (acc, val) => acc + val);
        expect(result).toBe(100);
    });

    it('should work with complex types', () => {
        const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
        const result = arr.aggregateLinq(0, (acc, val) => acc + val.x);
        expect(result).toBe(6);
    });
});
