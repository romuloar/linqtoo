import '../../src/index';

describe('single', () => {
    it('should return the only element when no predicate and single element', () => {
        expect([42].singleLinq()).toBe(42);
    });

    it('should throw if no predicate and empty array', () => {
        expect(() => [].singleLinq()).toThrow('Sequence contains no elements');
    });

    it('should throw if no predicate and more than one element', () => {
        expect(() => [1, 2].singleLinq()).toThrow('Sequence contains more than one element');
    });

    it('should return the single element that matches predicate', () => {
        const arr = [1, 2, 3];
        expect(arr.singleLinq(x => x === 2)).toBe(2);
    });

    it('should throw if no elements match predicate', () => {
        const arr = [1, 2, 3];
        expect(() => arr.singleLinq(x => x > 5)).toThrow('No element satisfies the condition');
    });

    it('should throw if more than one element matches predicate', () => {
        const arr = [1, 2, 3, 2];
        expect(() => arr.singleLinq(x => x === 2)).toThrow('More than one element satisfies the condition');
    });

    it('should work with strings', () => {
        const arr = ['a', 'b', 'c'];
        expect(arr.singleLinq(x => x === 'b')).toBe('b');
    });
});