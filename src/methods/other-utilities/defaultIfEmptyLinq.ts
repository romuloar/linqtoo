export function addDefaultIfEmptyLinq() {
    Array.prototype.defaultIfEmptyLinq = function <T>(this: T[], defaultValue: T): T[] {
        return this.length === 0 ? [defaultValue] : this;
    };
}