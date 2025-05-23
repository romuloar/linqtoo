import { compareWithMultipleKeys, createSortedArray } from './utils/sorting-utils';
export function addOrderByLinq() {
   
    /**
     * Implementation of orderByLinq
     * Sorts an array by a specified key in ascending order
     */                                  
    Array.prototype.orderByLinq = function <T, TKey>(this: T[], keySelector: (item: T) => TKey): T[] {
        // Define sorting keys
        const keys = [{
            selector: keySelector,
            direction: 'asc' as const
        }];

        // Comparison function for sorting
        const sortFn = (a: T, b: T): number => {
            return compareWithMultipleKeys(a, b, keys);
        };

        // Create and return the sorted array with state
        return createSortedArray(this, sortFn, keys);
    };

}