export function addLastOrDefaultLinq() {
    Array.prototype.lastOrDefaultLinq = function <T>(
        this: T[],
        predicate?: (item: T) => boolean,
        defaultValue?: T
    ): T | undefined {
        if (!predicate) {
            return this.length > 0 ? this[this.length - 1] : defaultValue;
        }

        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i])) {
                return this[i];
            }
        }

        return defaultValue;
    };
}