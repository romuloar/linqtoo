export function addRepeatLinq() {
    Array.repeatLinq = function <T>(value: T, count: number): T[] {
        if (count < 0) throw new Error('Count must be non-negative');
        return Array.from({ length: count }, () => value);
    };
}