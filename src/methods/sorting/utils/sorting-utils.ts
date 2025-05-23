// sorting-utils.ts
// Shared utility functions used by all sorting methods

/**
 * Generic comparison function for two values with null support
 */
// export function compareValues(a: any, b: any, direction: 'asc' | 'desc'): number {
//   // Handling null values
//   if (a == null && b == null) return 0;
//   if (a == null) return direction === 'asc' ? -1 : 1;
//   if (b == null) return direction === 'asc' ? 1 : -1;

//   // Regular comparison with direction support
//   if (a < b) return direction === 'asc' ? -1 : 1;
//   if (a > b) return direction === 'asc' ? 1 : -1;

//   return 0;
// }

export function compareValues(a: any, b: any, direction: 'asc' | 'desc'): number {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return direction === 'asc' ? -1 : 1;
    if (b === undefined) return direction === 'asc' ? 1 : -1;

    if (a === null && b === null) return 0;
    if (a === null) return direction === 'asc' ? -1 : 1;
    if (b === null) return direction === 'asc' ? 1 : -1;

    if (a < b) return direction === 'asc' ? -1 : 1;
    if (a > b) return direction === 'asc' ? 1 : -1;

    return 0;
}

/**
 * Function to compare two items using multiple criteria
 */
export function compareWithMultipleKeys<T>(
    a: T,
    b: T,
    keys: Array<{
        selector: (item: T) => any;
        direction: 'asc' | 'desc';
    }>
): number {
    // For each sorting criterion
    for (const { selector, direction } of keys) {
        const keyA = selector(a);
        const keyB = selector(b);

        // Compare using the generic comparison function
        const result = compareValues(keyA, keyB, direction);

        // If not equal, return the result
        if (result !== 0) {
            return result;
        }
        // Otherwise, continue to the next criterion
    }

    // All criteria resulted in equality
    return 0;
}

/**
 * Creates a copy of the array with sorting state
 */
export function createSortedArray<T>(
    array: T[],
    sortFn: (a: T, b: T) => number,
    keys: Array<{
        selector: (item: T) => any;
        direction: 'asc' | 'desc';
    }>
): T[] {
    // Create a copy of the array
    const result = [...array].sort(sortFn);

    // Add sorting state
    (result as any)._sortState = {
        keys: keys
    };

    return result;
}