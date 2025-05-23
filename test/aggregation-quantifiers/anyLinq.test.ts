import { addAnyLinq } from '../../src/methods/aggregation-quantifiers/anyLinq';

beforeAll(() => {
    addAnyLinq();
});

describe('Array.prototype.any', () => {
    it('should return true if array has any elements without predicate', () => {
        expect([1, 2, 3].anyLinq()).toBe(true);
        expect([].anyLinq()).toBe(false);
    });

    it('should return true if any element satisfies the predicate', () => {
        const arr = [1, 2, 3, 4];
        expect(arr.anyLinq(x => x > 3)).toBe(true);
        expect(arr.anyLinq(x => x === 2)).toBe(true);
    });

    it('should return false if no elements satisfy the predicate', () => {
        const arr = [1, 2, 3];
        expect(arr.anyLinq(x => x > 5)).toBe(false);
    });

    it('should work with falsy values', () => {
        const arr: any[] = [0, null, undefined, '', false];
        expect(arr.anyLinq()).toBe(true);
        expect(arr.anyLinq(x => Boolean(x))).toBe(false); // no truthy values
    });

    it('should work with objects and predicates', () => {
        const people = [{ age: 20 }, { age: 30 }];
        expect(people.anyLinq(p => p.age > 25)).toBe(true);
        expect(people.anyLinq(p => p.age > 35)).toBe(false);
    });
});