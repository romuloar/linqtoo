export function addSingleOrDefaultLinq() {
    Array.prototype.singleOrDefaultLinq = function <T>(this: T[], predicate?: (item: T) => boolean, defaultValue?: T): T | undefined {
        const filtered = predicate ? this.filter(predicate) : this;
        if (filtered.length === 1) {
            return filtered[0];
        }
        if (filtered.length === 0) {
            return defaultValue;
        }
        throw new Error("More than one element satisfies the condition");
    };
}