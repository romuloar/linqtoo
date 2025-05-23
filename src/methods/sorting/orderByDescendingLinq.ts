import { compareWithMultipleKeys, createSortedArray } from './utils/sorting-utils';

export function addOrderByDescendingLinq() {
    Array.prototype.orderByDescendingLinq = function <T, TKey>(this: T[], keySelector: (item: T) => TKey): T[] {
        // Define sorting keys
        const keys = [{
            selector: keySelector,
            direction: 'desc' as const
        }];

        // Comparison function for sorting
        const sortFn = (a: T, b: T): number => {
            return compareWithMultipleKeys(a, b, keys);
        };

        // Create and return the sorted array with state
        return createSortedArray(this, sortFn, keys);
    };
}