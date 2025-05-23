export function addSelectManyLinq() {
    Array.prototype.selectManyLinq = function <T, U>(this: T[], selector: (item: T) => U[]): U[] {
        return this.reduce<U[]>((acc, item) => acc.concat(selector(item)), []);
    };
}