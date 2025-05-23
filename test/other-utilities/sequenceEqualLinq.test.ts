import '../../src/index';

describe('sequenceEqualLinq', () => {
    it('should return true for same numbers', () => {
        expect([1, 2, 3].sequenceEqualLinq([1, 2, 3])).toBe(true);
    });

    it('should return false for different order', () => {
        expect([1, 2, 3].sequenceEqualLinq([3, 2, 1])).toBe(false);
    });

    it('should return false for different lengths', () => {
        expect([1, 2].sequenceEqualLinq([1, 2, 3])).toBe(false);
    });

    it('should return false for object arrays without comparer', () => {
        expect([{ id: 1 }].sequenceEqualLinq([{ id: 1 }])).toBe(false);
    });

    it('should return true for object arrays with comparer', () => {
        const a = [{ id: 1 }, { id: 2 }];
        const b = [{ id: 1 }, { id: 2 }];
        expect(a.sequenceEqualLinq(b, (x, y) => x.id === y.id)).toBe(true);
    });
});
