export function addSkipWhileLinq() {
    Array.prototype.skipWhileLinq = function <T>(this: T[], predicate: (item: T, index: number) => boolean): T[] {
        const result: T[] = [];
        let skipping = true;

        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            if (skipping && !predicate(item, i)) {
                skipping = false;
            }

            if (!skipping) {
                result.push(item);
            }
        }

        return result;
    };
}