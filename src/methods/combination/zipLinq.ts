export function addZipLinq() {
    Array.prototype.zipLinq = function <T, U, R>(
        this: T[],
        other: U[],
        resultSelector: (a: T, b: U) => R
    ): R[] {
        const length = Math.min(this.length, other.length);
        const result: R[] = [];

        for (let i = 0; i < length; i++) {
            result.push(resultSelector(this[i], other[i]));
        }

        return result;
    };
}