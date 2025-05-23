import '../../src/index';

describe('Array.prototype.distinctBy', () => {
    it('should return distinct elements by id', () => {
        const users = [
            { id: 1, name: 'Romulo' },
            { id: 2, name: 'Bia' },
            { id: 1, name: 'Felipe' }
        ];

        const distinctUsers = users.distinctByLinq(user => user.id);
        expect(distinctUsers).toEqual([
            { id: 1, name: 'Romulo' },
            { id: 2, name: 'Bia' }
        ]);
    });

    it('should return empty array when array is empty', () => {
        const arr: { id: number }[] = [];
        expect(arr.distinctByLinq(x => x.id)).toEqual([]);
    });

    it('should work with primitive values', () => {
        const arr = [1, 2, 2, 3, 1];
        const result = arr.distinctByLinq(x => x);
        expect(result).toEqual([1, 2, 3]);
    });

    it('should keep first occurrence when duplicates are found', () => {
        const arr = [
            { id: 1, name: 'A' },
            { id: 1, name: 'B' },
            { id: 2, name: 'C' }
        ];

        const result = arr.distinctByLinq(x => x.id);
        expect(result).toEqual([
            { id: 1, name: 'A' },
            { id: 2, name: 'C' }
        ]);
    });
});