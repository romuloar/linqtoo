import { compareWithMultipleKeys, createSortedArray } from './utils/sorting-utils';
export function addThenByLinq() {
 /**
 * Implementation of thenByLinq
 * Adds a secondary ascending sort criterion
 */
    Array.prototype.thenByLinq = function <T, TKey>(this: T[], keySelector: (item: T) => TKey): T[] {
        // Retrieve previous sort state or initialize a new one
        const previousState = (this as any)._sortState;

        // If no previous state exists, behave like orderByLinq
        if (!previousState) {
            return this.orderByLinq(keySelector);
        }

        // Add the new sorting criterion to the existing ones
        const keys = [
            ...previousState.keys,
            {
                selector: keySelector,
                direction: 'asc' as const
            }
        ];

        // Comparison function for sorting
        const sortFn = (a: T, b: T): number => {
            return compareWithMultipleKeys(a, b, keys);
        };

        // Create and return the sorted array with state
        return createSortedArray(this, sortFn, keys);
    };
}