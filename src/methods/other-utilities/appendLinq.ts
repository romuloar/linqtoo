export function addAppendLinq() {
    Array.prototype.appendLinq = function <T>(this: T[], value: T): T[] {
        return [...this, value];
    };
}