export function addUnionLinq() {
    Array.prototype.unionLinq = function <T>(
        this: T[],
        other: T[],
        comparer?: (a: T, b: T) => boolean
    ): T[] {
        if (!Array.isArray(other)) {
            throw new Error("Parameter must be an array");
        }

        const result: T[] = [...this];

        for (const item of other) {
            const exists = result.some(x =>
                comparer ? comparer(x, item) : x === item
            );
            if (!exists) {
                result.push(item);
            }
        }

        return result;
    };
}