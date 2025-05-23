export function addTakeWhileLinq() {
    Array.prototype.takeWhileLinq = function <T>(
        this: T[],
        predicate: (item: T, index: number) => boolean
    ): T[] {
        const result: T[] = [];
        for (let i = 0; i < this.length; i++) {
            if (!predicate(this[i], i)) break;
            result.push(this[i]);
        }
        return result;
    };
}