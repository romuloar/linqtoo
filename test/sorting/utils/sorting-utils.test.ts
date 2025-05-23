// Import the utility functions to be tested
import { compareValues, compareWithMultipleKeys, createSortedArray } from '../../../src/methods/sorting/utils/sorting-utils';

describe('compareValues', () => {
    // Tests for null handling in ascending order
    test('should handle null values correctly in ascending order', () => {
        // Both null values should be equal
        expect(compareValues(null, null, 'asc')).toBe(0);

        // Null should come before any value in ascending order
        expect(compareValues(null, 5, 'asc')).toBe(-1);

        // Any value should come after null in ascending order
        expect(compareValues(5, null, 'asc')).toBe(1);
    });

    // Tests for null handling in descending order
    test('should handle null values correctly in descending order', () => {
        // Both null values should be equal
        expect(compareValues(null, null, 'desc')).toBe(0);

        // Null should come after any value in descending order
        expect(compareValues(null, 5, 'desc')).toBe(1);

        // Any value should come before null in descending order
        expect(compareValues(5, null, 'desc')).toBe(-1);
    });

    // Tests for regular value comparisons in ascending order
    test('should compare regular values correctly in ascending order', () => {
        // Lesser value should come first in ascending order
        expect(compareValues(3, 5, 'asc')).toBe(-1);

        // Greater value should come after in ascending order
        expect(compareValues(5, 3, 'asc')).toBe(1);

        // Equal values should be equal
        expect(compareValues(5, 5, 'asc')).toBe(0);
    });

    // Tests for regular value comparisons in descending order
    test('should compare regular values correctly in descending order', () => {
        // Lesser value should come after in descending order
        expect(compareValues(3, 5, 'desc')).toBe(1);

        // Greater value should come first in descending order
        expect(compareValues(5, 3, 'desc')).toBe(-1);

        // Equal values should be equal
        expect(compareValues(5, 5, 'desc')).toBe(0);
    });

    // Tests for string comparisons
    test('should compare string values correctly', () => {
        expect(compareValues('apple', 'banana', 'asc')).toBe(-1);
        expect(compareValues('banana', 'apple', 'asc')).toBe(1);
        expect(compareValues('apple', 'apple', 'asc')).toBe(0);

        expect(compareValues('apple', 'banana', 'desc')).toBe(1);
        expect(compareValues('banana', 'apple', 'desc')).toBe(-1);
    });
});

describe('compareWithMultipleKeys', () => {
    // Define test objects with multiple properties
    type TestItem = {
        name: string;
        age: number;
        score: number | null;
    };

    const item1: TestItem = { name: 'Alice', age: 30, score: 85 };
    const item2: TestItem = { name: 'Alice', age: 25, score: 85 };
    const item3: TestItem = { name: 'Bob', age: 30, score: 90 };
    const item4: TestItem = { name: 'Alice', age: 30, score: null };

    // Test sorting with a single key
    test('should sort by a single key correctly', () => {
        const keys = [
            { selector: (item: TestItem) => item.name, direction: 'asc' as const }
        ];

        expect(compareWithMultipleKeys(item1, item2, keys)).toBe(0); // Same name
        expect(compareWithMultipleKeys(item1, item3, keys)).toBe(-1); // Alice before Bob
        expect(compareWithMultipleKeys(item3, item1, keys)).toBe(1); // Bob after Alice
    });

    // Test sorting with multiple keys in order of priority
    test('should sort by multiple keys in order of priority', () => {
        const keys = [
            { selector: (item: TestItem) => item.name, direction: 'asc' as const },
            { selector: (item: TestItem) => item.age, direction: 'asc' as const }
        ];

        // Same name, different age
        expect(compareWithMultipleKeys(item1, item2, keys)).toBe(1); // Alice 30 after Alice 25

        // Different name, first key decides
        expect(compareWithMultipleKeys(item1, item3, keys)).toBe(-1); // Alice before Bob regardless of age
    });

    // Test with mixed directions
    test('should handle mixed sort directions correctly', () => {
        const keys = [
            { selector: (item: TestItem) => item.name, direction: 'asc' as const },
            { selector: (item: TestItem) => item.age, direction: 'desc' as const }
        ];

        // Same name, different age, descending by age
        expect(compareWithMultipleKeys(item1, item2, keys)).toBe(-1); // Alice 30 before Alice 25
    });

    // Test handling of null values in multi-key comparison
    test('should handle null values in multi-key comparison', () => {
        const keys = [
            { selector: (item: TestItem) => item.name, direction: 'asc' as const },
            { selector: (item: TestItem) => item.score, direction: 'desc' as const }
        ];

        // Same name, one has null score
        expect(compareWithMultipleKeys(item1, item4, keys)).toBe(-1); // Item with score before null score
    });
});

describe('createSortedArray', () => {
    // Define test data
    type TestItem = {
        id: number;
        name: string;
        value: number;
    };

    const testArray: TestItem[] = [
        { id: 1, name: 'Apple', value: 10 },
        { id: 2, name: 'Banana', value: 5 },
        { id: 3, name: 'Cherry', value: 15 },
        { id: 4, name: 'Apple', value: 8 }
    ];

    // Test creating a sorted array with a custom sort function
    test('should create a sorted copy using the provided sort function', () => {
        // Sort by name ascending
        const sortKeys = [
            { selector: (item: TestItem) => item.name, direction: 'asc' as const }
        ];

        const sortFn = (a: TestItem, b: TestItem) => compareWithMultipleKeys(a, b, sortKeys);

        const result = createSortedArray(testArray, sortFn, sortKeys);

        // Verify the array is sorted correctly
        expect(result[0].name).toBe('Apple');
        expect(result[1].name).toBe('Apple');
        expect(result[2].name).toBe('Banana');
        expect(result[3].name).toBe('Cherry');

        // Original array should remain unmodified
        expect(testArray[0].id).toBe(1);
        expect(testArray[1].id).toBe(2);
        expect(testArray[2].id).toBe(3);
        expect(testArray[3].id).toBe(4);
    });

    // Test the sort state metadata
    test('should add sort state metadata to the result array', () => {
        const sortKeys = [
            { selector: (item: TestItem) => item.value, direction: 'desc' as const }
        ];

        const sortFn = (a: TestItem, b: TestItem) => compareWithMultipleKeys(a, b, sortKeys);

        const result = createSortedArray(testArray, sortFn, sortKeys);

        // Check the sort state was added
        expect((result as any)._sortState).toBeDefined();
        expect((result as any)._sortState.keys).toBe(sortKeys);
    });

    // Test with multiple sort criteria
    test('should sort correctly with multiple criteria', () => {
        const sortKeys = [
            { selector: (item: TestItem) => item.name, direction: 'asc' as const },
            { selector: (item: TestItem) => item.value, direction: 'desc' as const }
        ];

        const sortFn = (a: TestItem, b: TestItem) => compareWithMultipleKeys(a, b, sortKeys);

        const result = createSortedArray(testArray, sortFn, sortKeys);

        // First two items should both be "Apple", but in descending value order
        expect(result[0].name).toBe('Apple');
        expect(result[1].name).toBe('Apple');
        expect(result[0].value).toBe(10); // Higher value first
        expect(result[1].value).toBe(8);  // Lower value second
    });
});