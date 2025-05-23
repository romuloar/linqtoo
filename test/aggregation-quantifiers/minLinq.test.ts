import { addMinLinq } from '../../src/methods/aggregation-quantifiers/minLinq';

beforeAll(() => {
    addMinLinq();
});

describe('Array.prototype.min', () => {
    it('should return the minimum number in a numeric array', () => {
        expect([5, 1, 9, -3].minLinq()).toBe(-3);
    });

    it('should return undefined for an empty array', () => {
        expect([].minLinq()).toBeUndefined();
    });

    it('should return the minimum value using a selector function', () => {
        const items = [{ value: 10 }, { value: 2 }, { value: 7 }];
        expect(items.minLinq(x => x.value)).toBe(2);
    });

    it('should handle arrays with one element', () => {
        expect([42].minLinq()).toBe(42);
    });

    it('should throw if non-numeric values are present without selector', () => {
        const arr: any[] = [1, '2', 3];
        expect(() => arr.minLinq()).toThrow(TypeError);
    });

    it('should throw if selector returns non-numeric value', () => {
        const arr = [{ x: 'a' }, { x: 'b' }];
        expect(() => arr.minLinq(x => x.x as any)).toThrow(TypeError);
    });
});
