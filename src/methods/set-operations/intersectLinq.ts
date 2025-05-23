export function addIntersectLinq() {
    /**
   * Implementation of intersectLinq
   * Returns the common elements between two arrays, removing duplicates
   */
    Array.prototype.intersectLinq = function <T>(this: T[], other: T[]): T[] {
        if (!Array.isArray(other)) {
            throw new Error('Parameter must be an array');
        }

        const setB = new Set(other);
        const resultSet = new Set<T>();

        for (const item of this) {
            if (setB.has(item)) {
                resultSet.add(item);
            }
        }

        return [...resultSet];
    };
}