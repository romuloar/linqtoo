import '../../src/index';

describe('where', () => {
    it('should return elements that satisfy the predicate', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = arr.whereLinq(x => x > 3);
        expect(result).toEqual([4, 5]);
    });

    it('should return an empty array if no elements satisfy the predicate', () => {
        const arr = [1, 2, 3];
        const result = arr.whereLinq(x => x > 10);
        expect(result).toEqual([]);
    });

    it('should return all elements if all satisfy the predicate', () => {
        const arr = [2, 4, 6];
        const result = arr.whereLinq(x => x % 2 === 0);
        expect(result).toEqual([2, 4, 6]);
    });

    it('should work with empty arrays', () => {
        const arr: number[] = [];
        const result = arr.whereLinq(x => true);
        expect(result).toEqual([]);
    });

    it('should work with complex objects', () => {
        const arr = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
        const result = arr.whereLinq(x => x.id === 2);
        expect(result).toEqual([{ id: 2, name: 'b' }]);
    });
});