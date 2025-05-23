export function addLastLinq() {
    Array.prototype.lastLinq = function <T>(
        this: T[],
        predicate?: (item: T) => boolean
    ): T | undefined {
        if (!predicate) {
            return this.length > 0 ? this[this.length - 1] : undefined;
        }

        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i])) {
                return this[i];
            }
        }

        return undefined;
    };
}