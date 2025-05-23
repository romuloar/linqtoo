export function addFirstOrDefaultLinq() {
    Array.prototype.firstOrDefaultLinq = function <T>(
        this: T[],
        predicate?: (item: T) => boolean,
        defaultValue?: T
    ): T | undefined {
        if (!predicate) {
            return this.length > 0 ? this[0] : defaultValue;
        }

        for (const item of this) {
            if (predicate(item)) {
                return item;
            }
        }

        return defaultValue;
    };
}