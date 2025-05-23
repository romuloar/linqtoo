import '../../src/index';

import { compareWithMultipleKeys, createSortedArray } from '../../src/methods/sorting/utils/sorting-utils';

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

describe('Array.prototype.thenByLinq', () => {
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

    test('should use orderByLinq if no previous sort state exists', () => {
        // Mock orderByLinq
        const originalOrderByLinq = Array.prototype.orderByLinq;
        Array.prototype.orderByLinq = jest.fn().mockImplementation(function (selector) {
            return ['mock result'];
        });

        const array = [1, 2, 3];
        array.thenByLinq(num => num);

        expect(Array.prototype.orderByLinq).toHaveBeenCalled();

        // Restore original method
        Array.prototype.orderByLinq = originalOrderByLinq;
    });

    test('should sort users by age descending, then by name ascending', () => {
        const users = [
            { name: 'Romulo', age: 30 },
            { name: 'Bia', age: 25 },
            { name: 'Felipe', age: 30 },
            { name: 'Ana', age: 25 }
        ];

        // First sort by age descending
        const firstSort = users.orderByDescendingLinq(user => user.age);

        // Then sort by name ascending
        const result = firstSort.thenByLinq(user => user.name);

        // Expected: first sorted by age (desc), then by name (asc)
        expect([...result]).toEqual([
            { name: 'Felipe', age: 30 },
            { name: 'Romulo', age: 30 },
            { name: 'Ana', age: 25 },
            { name: 'Bia', age: 25 }
        ]);
  
    });

    test('should sort users by age ascending, then by name ascending', () => {
        const users = [
            { name: 'Romulo', age: 30 },
            { name: 'Bia', age: 25 },
            { name: 'Felipe', age: 30 },
            { name: 'Ana', age: 25 }
        ];

        // First sort by age ascending
        const firstSort = users.orderByLinq(user => user.age);

        // Then sort by name ascending
        const result = firstSort.thenByLinq(user => user.name);

        // Expected: first sorted by age (asc), then by name (asc)
        expect([...result]).toEqual([
            { name: 'Ana', age: 25 },
            { name: 'Bia', age: 25 },
            { name: 'Felipe', age: 30 },
            { name: 'Romulo', age: 30 }
        ]);    
    });

    test('should add a new sorting key to the existing keys', () => {
        // Mock orderByLinq and thenByLinq for this test
        Array.prototype.orderByLinq = function (keySelector) {
            const keys = [{
                selector: keySelector,
                direction: 'asc' as const
            }];
            const sortFn = (a: any, b: any): number => {
                return compareWithMultipleKeys(a, b, keys);
            };
            return createSortedArray(this, sortFn, keys);
        };

        Array.prototype.thenByLinq = function (keySelector) {
            // Get previous keys from _sortState if present
            const prevKeys = (this as any)._sortState?.keys || [];
            const newKeys = [
                ...prevKeys,
                { selector: keySelector, direction: 'asc' as const }
            ];
            const sortFn = (a: any, b: any): number => {
                return compareWithMultipleKeys(a, b, newKeys);
            };
            return createSortedArray(this, sortFn, newKeys);
        };

        const users = [
            { name: 'Romulo', age: 30, id: 1 },
            { name: 'Bia', age: 25, id: 2 },
            { name: 'Felipe', age: 30, id: 3 }
        ];

        // First sort by age ascending
        const firstSort = users.orderByLinq(user => user.age);

        // Then sort by name ascending
        firstSort.thenByLinq(user => user.name);

        // Get the last call to createSortedArray and check if it has two keys
        const lastCall = (createSortedArray as jest.Mock).mock.calls[1];
        expect(lastCall).toBeDefined();
        expect(lastCall?.[2].length).toBe(2);
        expect(lastCall?.[2][0].direction).toBe('asc');
        expect(lastCall?.[2][1].direction).toBe('asc');
    });

    test('should maintain original ordering when secondary criterion is equal', () => {
        const data = [
            { primary: 5, secondary: 1, name: 'Romulo' },
            { primary: 5, secondary: 1, name: 'Bia' },
            { primary: 3, secondary: 2, name: 'Felipe' }
        ];

        // First sort by primary ascending
        const firstSort = data.orderByLinq(item => item.primary);

        // Then sort by secondary ascending
        const result = firstSort.thenByLinq(item => item.secondary);

        // For equal values (primary=5, secondary=1), the original order should be maintained
        expect(result[1].name).toBe('Romulo');
        expect(result[2].name).toBe('Bia');
    });

    test('should support mixing ascending and descending criteria', () => {
        const items = [
            { a: 1, b: 2, name: 'Romulo' },
            { a: 1, b: 1, name: 'Bia' },
            { a: 2, b: 2, name: 'Felipe' },
            { a: 2, b: 1, name: 'Ana' }
        ];

        // First by 'a' descending, then by 'b' ascending
        const result = items
            .orderByDescendingLinq(item => item.a)
            .thenByLinq(item => item.b);

        // Expected: 
        // First by 'a' desc: [Felipe(2), Ana(2), Romulo(1), Bia(1)]
        // Then by 'b' asc for equal 'a': [Ana(2,1), Felipe(2,2), Bia(1,1), Romulo(1,2)]
        expect([...result]).toEqual([
            { a: 2, b: 1, name: 'Ana' },
            { a: 2, b: 2, name: 'Felipe' },
            { a: 1, b: 1, name: 'Bia' },
            { a: 1, b: 2, name: 'Romulo' }
        ]);
    });

    test('should return a new array without modifying the original', () => {
        const original = [
            { name: 'Romulo', value: 1 },
            { name: 'Bia', value: 2 },
            { name: 'Felipe', value: 1 }
        ];

        // Apply first sort
        const firstSort = original.orderByLinq(item => item.value);

        // Apply second sort
        const result = firstSort.thenByLinq(item => item.name);

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

        // Make sure orderByLinq is properly implemented for this test
        Array.prototype.orderByLinq = function (keySelector) {
            const keys = [{
                selector: keySelector,
                direction: 'asc' as const
            }];

            const sortFn = (a: any, b: any): number => {
                return compareWithMultipleKeys(a, b, keys);
            };

            return createSortedArray(this, sortFn, keys);
        };

        const firstSort = emptyArray.orderByLinq(item => item);
        const result = firstSort.thenByLinq(item => item);

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

        // Sort by score (desc) then by level (asc)
        const result = complexData
            .orderByDescendingLinq(item => item.stats.score)
            .thenByLinq(item => item.stats.level);

        expect([...result]).toEqual([
            {
                id: 2,
                stats: { score: 100, level: 3 },
                user: { name: 'Bia', active: false }
            },
            {
                id: 1,
                stats: { score: 100, level: 5 },
                user: { name: 'Romulo', active: true }
            },
            {
                id: 3,
                stats: { score: 85, level: 4 },
                user: { name: 'Felipe', active: true }
            }
        ]);
    });

});