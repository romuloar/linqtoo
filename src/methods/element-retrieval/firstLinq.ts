export function addFirstLinq() {
    Array.prototype.firstLinq = function <T>(this: T[], predicate?: (item: T) => boolean): T | undefined {
        if (!predicate) {
            return this.length > 0 ? this[0] : undefined;
        }

        for (const item of this) {
            if (predicate(item)) {
                return item;
            }
        }

        return undefined;
    };
}