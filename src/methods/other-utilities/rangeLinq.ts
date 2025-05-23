export function addRangeLinq() {
    Array.rangeLinq = function (start: number, count: number): number[] {
        if (count < 0) throw new Error("Count must be non-negative.");
        return Array.from({ length: count }, (_, i) => start + i);
    };
}