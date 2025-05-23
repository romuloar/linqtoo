export function addAnyLinq() {
    Array.prototype.anyLinq = function <T>(this: T[], predicate?: (item: T) => boolean): boolean {
        if (!predicate) {
            return this.length > 0;
        }

        for (const item of this) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    };
}