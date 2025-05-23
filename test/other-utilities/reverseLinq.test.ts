import { addReverseLinq } from '../../src/methods/other-utilities/reverseLinq';

beforeAll(() => {
    addReverseLinq();
});

describe('reverseLinq', () => {
    it('should reverse a number array', () => {
        expect([1, 2, 3].reverseLinq()).toEqual([3, 2, 1]);
    });

    it('should reverse a string array', () => {
        expect(['Romulo', 'Bia', 'Felipe'].reverseLinq()).toEqual(['Felipe', 'Bia', 'Romulo']);
    });

    it('should return empty array when input is empty', () => {
        const empty: number[] = [];
        expect(empty.reverseLinq()).toEqual([]);
    });

    it('should not mutate the original array', () => {
        const original = [1, 2, 3];
        const result = original.reverseLinq();
        expect(original).toEqual([1, 2, 3]);
        expect(result).toEqual([3, 2, 1]);
    });
});