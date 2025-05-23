import '../../src/index';

describe('first', () => {
    it('should return the first element in a non-empty array', () => {
        const arr = [1, 2, 3];
        expect(arr.firstLinq()).toBe(1);
    });

    it('should return undefined for an empty array', () => {
        const arr: number[] = [];
        expect(arr.firstLinq()).toBeUndefined();
    });

    it('should return the first matching element based on predicate', () => {
        const arr = [1, 2, 3, 4];
        expect(arr.firstLinq(x => x > 2)).toBe(3);
    });

    it('should return undefined if no element matches the predicate', () => {
        const arr = [1, 2, 3];
        expect(arr.firstLinq(x => x > 10)).toBeUndefined();
    });

    it('should work with strings', () => {
        const arr = ['apple', 'banana', 'cherry'];
        expect(arr.firstLinq()).toBe('apple');
        expect(arr.firstLinq(fruit => fruit.startsWith('b'))).toBe('banana');
    });

    it('should work with complex objects', () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(arr.firstLinq(x => x.id === 2)).toEqual({ id: 2 });
    });
});