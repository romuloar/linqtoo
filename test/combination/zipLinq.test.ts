import { addZipLinq } from '../../src/methods/combination/zipLinq';

beforeAll(() => {
    addZipLinq();
});

describe('zip', () => {
    it('should zip two arrays of same length', () => {
        const a = [1, 2, 3];
        const b = ['a', 'b', 'c'];
        const result = a.zipLinq(b, (x, y) => `${x}-${y}`);
        expect(result).toEqual(['1-a', '2-b', '3-c']);
    });

    it('should zip two arrays of different lengths and truncate to shortest', () => {
        const a = [1, 2];
        const b = ['a', 'b', 'c'];
        const result = a.zipLinq(b, (x, y) => `${x}-${y}`);
        expect(result).toEqual(['1-a', '2-b']);
    });

    it('should return empty if either array is empty', () => {
        expect([1, 2].zipLinq([], (x, y) => [x, y])).toEqual([]);
        expect([].zipLinq([1, 2], (x, y) => [x, y])).toEqual([]);
    });

    it('should support complex types', () => {
        const a = [{ name: 'Romulo' }, { name: 'Bia' }];
        const b = [20, 25];
        const result = a.zipLinq(b, (x, y) => ({ name: x.name, age: y }));
        expect(result).toEqual([
            { name: 'Romulo', age: 20 },
            { name: 'Bia', age: 25 },
        ]);
    });
});