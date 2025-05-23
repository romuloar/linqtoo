import { addOrderByLinq } from '../../src/methods/sorting/orderByLinq';
import { compareWithMultipleKeys, createSortedArray } from '../../src/methods/sorting/utils/sorting-utils';

beforeAll(() => {
    addOrderByLinq();
});


// Mock the dependencies
jest.mock('../../src/methods/sorting/utils/sorting-utils', () => ({
    compareWithMultipleKeys: jest.fn(),
    createSortedArray: jest.fn((array, sortFn) => {
        return [...array].sort(sortFn);
    })
}));

describe('Array.prototype.orderByLinq', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();

        // Configure default behavior of compareWithMultipleKeys mock
        (compareWithMultipleKeys as jest.Mock).mockImplementation((a, b, keys) => {
            const key = keys[0];
            const aValue = key.selector(a);
            const bValue = key.selector(b);
            if (aValue === bValue) return 0;

            const comparison = aValue > bValue ? 1 : -1;
            return key.direction === 'desc' ? -comparison : comparison;
        });
    });

    test('should sort numbers in ascending order', () => {
        const numbers = [5, 1, 3, 2, 4];
        const result = numbers.orderByLinq(num => num);

        expect(result).toEqual([1, 2, 3, 4, 5]);
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should sort strings in ascending order', () => {
        const names = ['Romulo', 'Bia', 'Felipe'];
        const result = names.orderByLinq(name => name);

        expect(result).toEqual(['Bia', 'Felipe', 'Romulo']);
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should sort objects based on a numeric property', () => {
        const users = [
            { id: 3, name: 'Bia' },
            { id: 1, name: 'Romulo' },
            { id: 2, name: 'Felipe' }
        ];

        const result = users.orderByLinq(user => user.id);

        expect(result).toEqual([
            { id: 1, name: 'Romulo' },
            { id: 2, name: 'Felipe' },
            { id: 3, name: 'Bia' }
        ]);
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should sort objects based on a string property', () => {
        const users = [
            { id: 1, name: 'Romulo' },
            { id: 2, name: 'Bia' },
            { id: 3, name: 'Felipe' }
        ];

        const result = users.orderByLinq(user => user.name);

        expect(result).toEqual([
            { id: 2, name: 'Bia' },
            { id: 3, name: 'Felipe' },
            { id: 1, name: 'Romulo' }
        ]);
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should maintain order when values are equal', () => {
        const data = [
            { value: 5, name: 'Romulo' },
            { value: 5, name: 'Bia' },
            { value: 5, name: 'Felipe' }
        ];

        const result = data.orderByLinq(item => item.value);

        // Original order should be maintained for equal values
        expect(result[0].name).toBe('Romulo');
        expect(result[1].name).toBe('Bia');
        expect(result[2].name).toBe('Felipe');
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should work with an empty array', () => {
        const emptyArray: number[] = [];
        const result = emptyArray.orderByLinq(num => num);

        expect(result).toEqual([]);
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should work with an array of a single element', () => {
        const singleItemArray = ['Felipe'];
        const result = singleItemArray.orderByLinq(name => name);

        expect(result).toEqual(['Felipe']);
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should call compareWithMultipleKeys with the correct keys', () => {
        const names = ['Romulo', 'Bia', 'Felipe'];
        names.orderByLinq(name => name);

        // Verify compareWithMultipleKeys was called with the correct keys
        const lastCall = (compareWithMultipleKeys as jest.Mock).mock.calls[0];
        expect(lastCall[2]).toEqual([{
            selector: expect.any(Function),
            direction: 'asc'
        }]);
    });

    test('should return a new array without modifying the original', () => {
        const original = ['Romulo', 'Bia', 'Felipe'];
        const result = original.orderByLinq(name => name);

        expect(result).toEqual(['Bia', 'Felipe', 'Romulo']);
        expect(original).toEqual(['Romulo', 'Bia', 'Felipe']); // Original array should not be modified
        expect(result).not.toBe(original); // Should be a new instance
    });

    test('should handle arrays with duplicate values correctly', () => {
        const duplicates = [3, 1, 3, 2, 1];
        const result = duplicates.orderByLinq(num => num);

        expect(result).toEqual([1, 1, 2, 3, 3]);
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });

    test('should handle custom objects with custom comparator', () => {
        // Create custom objects
        const customObjects = [
            { data: { priority: 3 }, name: 'Romulo' },
            { data: { priority: 1 }, name: 'Bia' },
            { data: { priority: 2 }, name: 'Felipe' }
        ];

        // Sort by nested property
        const result = customObjects.orderByLinq(obj => obj.data.priority);

        expect(result).toEqual([
            { data: { priority: 1 }, name: 'Bia' },
            { data: { priority: 2 }, name: 'Felipe' },
            { data: { priority: 3 }, name: 'Romulo' }
        ]);
        expect(compareWithMultipleKeys).toHaveBeenCalled();
        expect(createSortedArray).toHaveBeenCalled();
    });
});