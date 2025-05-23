import { addIntersectLinq } from '../../src/methods/set-operations/intersectLinq';

beforeAll(() => {
  addIntersectLinq();
});

describe('intersectLinq', () => {
    it('should return common numbers', () => {
        expect([1, 2, 3].intersectLinq([2, 3, 4])).toEqual([2, 3]);
    });

    it('should return common strings', () => {
        expect(['Romulo', 'Bia', 'Felipe'].intersectLinq(['Bia', 'Felipe'])).toEqual(['Bia', 'Felipe']);
    });

    it('should return empty array when no intersection', () => {
        expect([1, 2, 3].intersectLinq([4, 5])).toEqual([]);
    });

    it('should handle empty arrays', () => {
        const empty: number[] = [];
        expect(empty.intersectLinq([1, 2])).toEqual([]);
        expect([1, 2].intersectLinq([])).toEqual([]);
    });

    it('should remove duplicates from result', () => {
        expect([1, 2, 2, 3].intersectLinq([2, 3, 3])).toEqual([2, 3]);
    });

    it('should throw if other is not an array', () => {
        expect(() => [1, 2].intersectLinq(undefined as any)).toThrow('Parameter must be an array');
    });
});
