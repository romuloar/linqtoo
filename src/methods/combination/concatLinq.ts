export function addConcatLinq() {
    /**
   * Implementation of concatLinq
   * Concatenates two sequences into a single sequence
   */
    Array.prototype.concatLinq = function <T>(this: T[], other: T[]): T[] {
        if (!Array.isArray(other)) {
            throw new Error('Parameter must be an array');
        }

        // Create a new array with elements from both sequences
        return [...this, ...other];
    };
}