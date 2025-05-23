import { addAverageLinq } from '../../src/methods/aggregation-quantifiers/averageLinq';

beforeAll(() => { 
    addAverageLinq();
});

describe('Array.prototype.average', () => {
    it('should calculate average of numbers', () => {
        expect([1, 2, 3].averageLinq()).toBe(2);
        expect([10, 20, 30, 40].averageLinq()).toBe(25);
    });

    it('should return NaN for empty array', () => {
        expect([].averageLinq()).toBeNaN();
    });

    it('should use selector function', () => {
        const users = [
            { name: 'Alice', age: 20 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 40 }
        ];
        expect(users.averageLinq(u => u.age)).toBe(30);
    });

    it('should work with one element', () => {
        expect([7].averageLinq()).toBe(7);
    });

    it('should return NaN if array is empty and selector is used', () => {
        const result = ([] as { age: number }[]).averageLinq(u => u.age);
        expect(result).toBeNaN();
    });

    it('should ignore selector if not passed', () => {
        expect([4, 6, 10].averageLinq()).toBe(20 / 3);
    });

    it('should handle negative numbers', () => {
        expect([-10, 0, 10].averageLinq()).toBe(0);
    });

    it('should handle floats', () => {
        expect([1.5, 2.5, 3.5].averageLinq()).toBeCloseTo(2.5);
    });
});
