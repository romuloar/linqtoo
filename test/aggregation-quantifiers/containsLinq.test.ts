import '../../src/index';

describe('Array.prototype.contains', () => {
    it('should return true if the array contains the item', () => {
        expect([1, 2, 3].containsLinq(2)).toBe(true);
        expect(['a', 'b', 'c'].containsLinq('b')).toBe(true);
    });

    it('should return false if the array does not contain the item', () => {
        expect([1, 2, 3].containsLinq(4)).toBe(false);
        expect(['a', 'b', 'c'].containsLinq('d')).toBe(false);
    });

    it('should work with objects by reference', () => {
        const obj = { id: 1 };
        const arr = [obj];
        expect(arr.containsLinq(obj)).toBe(true);
        expect(arr.containsLinq({ id: 1 })).toBe(false); // different reference
    });

    it('should work with empty arrays', () => {
        const arr: number[] = [];
        expect(arr.containsLinq(1)).toBe(false);
        expect(arr.containsLinq(null as any)).toBe(false);
    });

    it('should distinguish between types', () => {
        expect([1, 2, 3].containsLinq('1' as any)).toBe(false); // strict equality
    });
});
