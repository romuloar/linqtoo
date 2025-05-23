export function addReverseLinq() {
    /**
    * Implementation of reverseLinq
    * Returns a new array with the elements in reverse order.
    */
    Array.prototype.reverseLinq = function <T>(this: T[]): T[] {
        return [...this].reverse(); // Avoid mutating the original array
    };
}