import { compareWithMultipleKeys, createSortedArray } from './utils/sorting-utils';
export function addThenByDescendingLinq() {
 /**
 * Implementation of thenByDescendingLinq
 * Adds a secondary sorting criterion in descending order
 */
    Array.prototype.thenByDescendingLinq = function <T, TKey>(this: T[], keySelector: (item: T) => TKey): T[] {
        // Get previous sorting state or initialize new state
        const previousState = (this as any)._sortState;

        // If there's no previous state, behave like orderByDescendingLinq
        if (!previousState) {
            return this.orderByDescendingLinq(keySelector);
        }

        // Add the new criterion to existing ones
        const keys = [
            ...previousState.keys,
            {
                selector: keySelector,
                direction: 'desc' as const
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