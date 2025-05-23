import { addCountLinq } from '../../src/methods/aggregation-quantifiers/countLinq';

beforeAll(() => {
    addCountLinq();
});

describe('Array.prototype.count', () => {
    it('should return the total number of items when no predicate is provided', () => {
        expect([1, 2, 3].countLinq()).toBe(3);
        expect(['a', 'b', 'c', 'd'].countLinq()).toBe(4);
        expect([].countLinq()).toBe(0);
    });

    it('should return the number of items that match the predicate', () => {
        expect([1, 2, 3, 4, 5].countLinq(n => n % 2 === 0)).toBe(2); // even numbers
        expect(['apple', 'banana', 'cherry'].countLinq(s => s.includes('a'))).toBe(2);
    });

    it('should return 0 when no items match the predicate', () => {
        expect([1, 3, 5].countLinq(n => n % 2 === 0)).toBe(0);
        expect(['apple', 'banana'].countLinq(s => s.length > 10)).toBe(0);
    });

    it('should work with complex object arrays', () => {
        const users = [
            { name: 'Alice', active: true },
            { name: 'Bob', active: false },
            { name: 'Charlie', active: true },
        ];
        expect(users.countLinq(user => user.active)).toBe(2);
        expect(users.countLinq(user => !user.active)).toBe(1);
    });

    it('should not mutate the original array', () => {
        const arr = [1, 2, 3];
        arr.countLinq(n => n > 1);
        expect(arr).toEqual([1, 2, 3]);
    });

    it('should work with falsy values in the array', () => {
        const arr: (number | null | undefined | string | boolean)[] = [0, null, undefined, '', false];

        expect(arr.countLinq()).toBe(5);
        expect(arr.countLinq((x: unknown) => Boolean(x))).toBe(0); // count only truthy values
    });

    it('should support array of booleans', () => {
        const arr = [true, false, true];
        expect(arr.countLinq()).toBe(3);
        expect(arr.countLinq(b => b)).toBe(2);
    });

    it('should support array of undefined values', () => {
        const arr = [undefined, undefined];
        expect(arr.countLinq()).toBe(2);
        expect(arr.countLinq(v => v === undefined)).toBe(2);
    });

    it('should support array of mixed types', () => {
        const arr = [1, 'a', false, null];
        expect(arr.countLinq()).toBe(4);
        expect(arr.countLinq(x => typeof x === 'string')).toBe(1);
    });

    it('should throw no error when predicate is undefined', () => {
        const arr = [1, 2, 3];
        expect(() => arr.countLinq(undefined)).not.toThrow();
        expect(arr.countLinq(undefined)).toBe(3);
    });
});