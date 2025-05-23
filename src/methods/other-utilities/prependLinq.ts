export function addPrependLinq() {
    Array.prototype.prependLinq = function <T>(this: T[], item: T): T[] {
        return [item, ...this];
    };
}