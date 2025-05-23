export function addCountLinq() {
    Array.prototype.countLinq = function <T>(this: T[], predicate?: (item: T) => boolean): number {
        let counter = 0;
        for (const item of this) {
            if (!predicate || predicate(item)) {
                counter++;
            }
        }
        return counter;
    };
}