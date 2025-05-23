import { addGroupByLinq } from '../../src/methods/grouping/groupByLinq';

beforeAll(() => {
    addGroupByLinq();
});

describe('Array.prototype.groupBy', () => {
    it('should group numbers by even or odd', () => {
        const result = [1, 2, 3, 4, 5, 6].groupByLinq(n => n % 2 === 0 ? 'even' : 'odd');
        expect(result).toEqual({
            odd: [1, 3, 5],
            even: [2, 4, 6]
        });
    });

    it('should group objects by a property', () => {
        const people = [
            { name: 'Romulo', age: 30 },
            { name: 'Bia', age: 25 },
            { name: 'Felipe', age: 30 }
        ];
        const result = people.groupByLinq(p => p.age);
        expect(result).toEqual({
            '25': [{ name: 'Bia', age: 25 }],
            '30': [
                { name: 'Romulo', age: 30 },
                { name: 'Felipe', age: 30 }
            ]
        });
    });

    it('should return an empty object for empty array', () => {
        const result = [].groupByLinq(x => x);
        expect(result).toEqual({});
    });
});