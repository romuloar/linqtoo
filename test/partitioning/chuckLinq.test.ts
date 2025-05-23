import { addChuckLinq } from '../../src/methods/partitioning/chuckLinq';

beforeAll(() => {
    addChuckLinq();
});


describe('chunkLinq', () => {
    test('splits array into chunks of given size', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        expect(arr.chunkLinq(3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    test('returns empty array for empty input', () => {
        expect([].chunkLinq(3)).toEqual([]);
    });

    test('throws error for zero or negative size', () => {
        expect(() => [1, 2, 3].chunkLinq(0)).toThrow();
        expect(() => [1, 2, 3].chunkLinq(-1)).toThrow();
    });

    test('chunk size larger than array returns single chunk', () => {
        expect([1, 2].chunkLinq(5)).toEqual([[1, 2]]);
    });
});