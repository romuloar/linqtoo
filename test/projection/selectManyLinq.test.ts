import { addSelectManyLinq } from '../../src/methods/projection/selectManyLinq';

beforeAll(() => {
    addSelectManyLinq();
});

describe('selectManyLinq', () => {
    it('should flatten arrays returned by selector', () => {
        const arr = [1, 2, 3];
        const result = arr.selectManyLinq(x => [x, x * 2]);
        expect(result).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it('should work with empty array', () => {
        const arr: number[] = [];
        const result = arr.selectManyLinq(x => [x]);
        expect(result).toEqual([]);
    });

    it('should work with selector returning empty arrays', () => {
        const arr = [1, 2, 3];
        const result = arr.selectManyLinq(x => []);
        expect(result).toEqual([]);
    });

    it('should work with objects', () => {
        const arr = [
            { id: 1, values: ['a', 'b'] },
            { id: 2, values: ['c'] }
        ];
        const result = arr.selectManyLinq(x => x.values);
        expect(result).toEqual(['a', 'b', 'c']);
    });
});