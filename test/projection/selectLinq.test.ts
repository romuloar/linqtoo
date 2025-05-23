import '../../src/index';

describe('selectLinq', () => {
    it('should project each element to a new form', () => {
        const numbers = [1, 2, 3];
        const squares = numbers.selectLinq(x => x * x);
        expect(squares).toEqual([1, 4, 9]);
    });

    it('should work with objects', () => {
        const users = [
            { id: 1, name: 'Romulo' },
            { id: 2, name: 'Bia' },
        ];
        const names = users.selectLinq(u => u.name);
        expect(names).toEqual(['Romulo', 'Bia']);
    });

    it('should return empty array when called on empty array', () => {
        const empty: number[] = [];
        const result = empty.selectLinq(x => x);
        expect(result).toEqual([]);
    });
});