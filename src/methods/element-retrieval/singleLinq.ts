export function addSingleLinq() {
    Array.prototype.singleLinq = function <T>(this: T[], predicate?: (item: T) => boolean): T {
        let found: T | undefined;
        let foundCount = 0;

        if (!predicate) {
            if (this.length === 1) return this[0];
            if (this.length === 0) throw new Error('Sequence contains no elements');
            throw new Error('Sequence contains more than one element');
        }

        for (const item of this) {
            if (predicate(item)) {
                found = item;
                foundCount++;
                if (foundCount > 1) break;
            }
        }

        if (foundCount === 1) {
            return found!;
        }

        if (foundCount === 0) {
            throw new Error('No element satisfies the condition');
        }

        throw new Error('More than one element satisfies the condition');
    };
}