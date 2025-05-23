export function addSequenceEqualLinq() {
    Array.prototype.sequenceEqualLinq = function <T>(
        this: T[],
        other: T[],
        comparer?: (a: T, b: T) => boolean
    ): boolean {
        if (!Array.isArray(other)) {
            throw new Error("Parameter must be an array");
        }

        if (this.length !== other.length) return false;

        return this.every((item, index) => {
            if (comparer) {
                return comparer(item, other[index]);
            } else {
                return item === other[index];
            }
        });
    };
}