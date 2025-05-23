export function addAverageLinq() {
    Array.prototype.averageLinq = function <T>(this: T[], selector?: (item: T) => number): number {
        if (this.length === 0) return NaN;

        let total = 0;
        let count = 0;

        for (const item of this) {
            const value = selector ? selector(item) : (item as unknown as number);
            total += value;
            count++;
        }

        return total / count;
    };
}