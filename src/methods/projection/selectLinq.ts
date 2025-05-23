export function addSelectLinq() {
    Array.prototype.selectLinq = function <T, U>(this: T[], selector: (item: T) => U): U[] {
        return this.map(selector);
    };
}