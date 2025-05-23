export function addSumLinq() {
    Array.prototype.sumLinq = function (this: number[], selector?: (item: number) => number): number {
        let total = 0;
        for (const item of this) {
            const value = selector ? selector(item) : item;
            total += value;
        }
        return total;
    };
}