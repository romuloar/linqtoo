export function addWhereLinq() {
    Array.prototype.whereLinq = function <T>(this: T[], predicate: (item: T) => boolean): T[] {
        return this.filter(predicate);
    };
}