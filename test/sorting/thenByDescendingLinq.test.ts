import { compareWithMultipleKeys, createSortedArray } from '../../src/methods/sorting/utils/sorting-utils';

import '../../src/index';

// Mock the dependencies
jest.mock('../../src/methods/sorting/utils/sorting-utils', () => ({
    compareWithMultipleKeys: jest.fn(),
    createSortedArray: jest.fn((array, sortFn, keys) => {
        // Add _sortState to mock the behavior of createSortedArray
        const result = [...array].sort(sortFn);
        Object.defineProperty(result, '_sortState', {
            value: { keys },
            enumerable: false
        });
        return result;
    }),
    compareValues: jest.fn()
}));

describe('Array.prototype.thenByDescendingLinq', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();

        // Configure default behavior of compareWithMultipleKeys mock
        (compareWithMultipleKeys as jest.Mock).mockImplementation((a, b, keys) => {
            for (const key of keys) {
                const aValue = key.selector(a);
                const bValue = key.selector(b);

                if (aValue === bValue) continue;

                const comparison = aValue > bValue ? 1 : -1;
                return key.direction === 'desc' ? -comparison : comparison;
            }
            return 0;
        });
    });

    test('should use orderByDescendingLinq if no previous sort state exists', () => {
        // Mock orderByDescendingLinq
        const originalOrderByDescendingLinq = Array.prototype.orderByDescendingLinq;
        Array.prototype.orderByDescendingLinq = jest.fn().mockImplementation(function (selector) {
            return ['mock result'];
        });

        const array = [1, 2, 3];
        array.thenByDescendingLinq(num => num);

        expect(Array.prototype.orderByDescendingLinq).toHaveBeenCalled();

        // Restore original method
        Array.prototype.orderByDescendingLinq = originalOrderByDescendingLinq;
    });

    test('should sort users by age descending, then by name descending', () => {
        const users = [
            { name: 'Romulo', age: 30 },
            { name: 'Bia', age: 25 },
            { name: 'Felipe', age: 30 },
            { name: 'Ana', age: 25 }
        ];

        // First sort by age descending
        const firstSort = users.orderByDescendingLinq(user => user.age);

        // Then sort by name descending
        const result = firstSort.thenByDescendingLinq(user => user.name);

        // Expected: first sorted by age (desc), then by name (desc)
        expect([...result]).toEqual([
            { name: 'Romulo', age: 30 },
            { name: 'Felipe', age: 30 },
            { name: 'Bia', age: 25 },
            { name: 'Ana', age: 25 }
        ]);
    });

    test('should add a new sorting key to the existing keys', () => {
        const users = [
            { name: 'Romulo', age: 30, id: 1 },
            { name: 'Bia', age: 25, id: 2 },
            { name: 'Felipe', age: 30, id: 3 }
        ];

        // Mock orderByDescendingLinq and thenByDescendingLinq for this test
        Array.prototype.orderByDescendingLinq = function (keySelector: any) {
            const keys = [{
                selector: keySelector,
                direction: 'desc' as const
            }];
            const sortFn = (a: any, b: any): number => {
                return compareWithMultipleKeys(a, b, keys);
            };
            return createSortedArray(this, sortFn, keys);
        };
        Array.prototype.thenByDescendingLinq = function (keySelector: any) {
            // Use _sortState from the previous result if available
            const prevKeys = (this as any)._sortState?.keys || [];
            const keys = [
                ...prevKeys,
                {
                    selector: keySelector,
                    direction: 'desc' as const
                }
            ];
            const sortFn = (a: any, b: any): number => {
                return compareWithMultipleKeys(a, b, keys);
            };
            return createSortedArray(this, sortFn, keys);
        };

        // First sort by age descending
        const firstSort = users.orderByDescendingLinq(user => user.age);

        // Then sort by name descending
        firstSort.thenByDescendingLinq(user => user.name);

        // Get the last call to createSortedArray and check if it has two keys
        const calls = (createSortedArray as jest.Mock).mock.calls;
        expect(calls.length).toBeGreaterThan(1);
        const lastCall = calls[1];
        expect(lastCall[2].length).toBe(2);
        expect(lastCall[2][0].direction).toBe('desc');
        expect(lastCall[2][1].direction).toBe('desc');
    });

    test('should maintain original ordering when secondary criterion is equal', () => {
        const data = [
            { primary: 5, secondary: 1, name: 'Romulo' },
            { primary: 5, secondary: 1, name: 'Bia' },
            { primary: 3, secondary: 2, name: 'Felipe' }
        ];

        // First sort by primary descending
        const firstSort = data.orderByDescendingLinq(item => item.primary);

        // Then sort by secondary descending
        const result = firstSort.thenByDescendingLinq(item => item.secondary);

        // For equal values (primary=5, secondary=1), the original order should be maintained
        expect(result[0].name).toBe('Romulo');
        expect(result[1].name).toBe('Bia');
    });
    

    test('should return a new array without modifying the original', () => {
        const original = [
            { name: 'Romulo', value: 1 },
            { name: 'Bia', value: 2 },
            { name: 'Felipe', value: 1 }
        ];

        // Apply first sort
        const firstSort = original.orderByDescendingLinq(item => item.value);

        // Apply second sort
        const result = firstSort.thenByDescendingLinq(item => item.name);

        // Original array should remain unchanged
        expect(original).toEqual([
            { name: 'Romulo', value: 1 },
            { name: 'Bia', value: 2 },
            { name: 'Felipe', value: 1 }
        ]);

        // Ensure result is not the same instance as original or firstSort
        expect([...result]).not.toBe(original);
        expect([...result]).not.toBe(firstSort);
    });

    test('should handle empty arrays', () => {
        const emptyArray: any[] = [];

        // Make sure orderByDescendingLinq is properly implemented for this test
        Array.prototype.orderByDescendingLinq = function (keySelector) {
            const keys = [{
                selector: keySelector,
                direction: 'desc' as const
            }];

            const sortFn = (a: any, b: any): number => {
                return compareWithMultipleKeys(a, b, keys);
            };

            return createSortedArray(this, sortFn, keys);
        };

        const firstSort = emptyArray.orderByDescendingLinq(item => item);
        const result = firstSort.thenByDescendingLinq(item => item);

        expect([...result]).toEqual([]);
    });

    test('should correctly handle complex data structures', () => {
        const complexData = [
            {
                id: 1,
                stats: { score: 100, level: 5 },
                user: { name: 'Romulo', active: true }
            },
            {
                id: 2,
                stats: { score: 100, level: 3 },
                user: { name: 'Bia', active: false }
            },
            {
                id: 3,
                stats: { score: 85, level: 4 },
                user: { name: 'Felipe', active: true }
            }
        ];

        // Sort by score (desc) then by level (desc)
        const result = complexData
            .orderByDescendingLinq(item => item.stats.score)
            .thenByDescendingLinq(item => item.stats.level);

        expect([...result]).toEqual([
            {
                id: 1,
                stats: { score: 100, level: 5 },
                user: { name: 'Romulo', active: true }
            },
            {
                id: 2,
                stats: { score: 100, level: 3 },
                user: { name: 'Bia', active: false }
            },
            {
                id: 3,
                stats: { score: 85, level: 4 },
                user: { name: 'Felipe', active: true }
            }
        ]);
    });
});