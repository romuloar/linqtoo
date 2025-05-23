import '../../src/index';

describe('Array.prototype.all', () => {
    it('should return true for empty array', () => {
        expect([].allLinq()).toBe(true);
        expect([].allLinq(x => x > 0)).toBe(true);
    });

    it('should return true if all elements are truthy when no predicate is provided', () => {
        expect([1, 'a', true, {}].allLinq()).toBe(true);
    });

    it('should return false if any element is falsy when no predicate is provided', () => {
        expect([1, 0, true].allLinq()).toBe(false);
        expect([null, 1].allLinq()).toBe(false);
    });

    it('should return true if all elements satisfy the predicate', () => {
        expect([2, 4, 6].allLinq(x => x % 2 === 0)).toBe(true);
    });

    it('should return false if any element does not satisfy the predicate', () => {
        expect([2, 3, 6].allLinq(x => x % 2 === 0)).toBe(false);
    });

    it('should work with falsy values and predicates', () => {
        const arr = [0, null, undefined, '', false];
        expect(arr.allLinq()).toBe(false); // all are falsy, so returns false
        expect(arr.allLinq(x => x === null || x === undefined || x === 0 || x === '' || x === false)).toBe(true);
    });
});