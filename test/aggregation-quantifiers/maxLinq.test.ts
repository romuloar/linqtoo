import '../../src/index';

describe('Array.prototype.max', () => {
    it('should return the maximum number in a numeric array', () => {
        expect([5, 1, 9, -3].maxLinq()).toBe(9);
    });

    it('should return undefined for an empty array', () => {
        expect([].maxLinq()).toBeUndefined();
    });

    it('should return the maximum value using a selector function', () => {
        const items = [{ value: 10 }, { value: 22 }, { value: 7 }];
        expect(items.maxLinq(x => x.value)).toBe(22);
    });

    it('should handle arrays with one element', () => {
        expect([42].maxLinq()).toBe(42);
    });

    it('should throw if non-numeric values are present without selector', () => {
        const arr: any[] = [1, '2', 3];
        expect(() => arr.maxLinq()).toThrow(TypeError);
    });

    it('should throw if selector returns non-numeric value', () => {
        const arr = [{ x: 'a' }, { x: 'b' }];
        expect(() => arr.maxLinq(x => x.x as any)).toThrow(TypeError);
    });
});
