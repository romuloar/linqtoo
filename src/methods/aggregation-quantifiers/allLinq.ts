export function addAllLinq() {
    Array.prototype.allLinq = function <T>(this: T[], predicate?: (item: T) => boolean): boolean {
        if (!predicate) {
            // If no predicate, check all items are truthy
            for (const item of this) {
                if (!item) return false;
            }
            return true;
        } else {
            // If predicate, check all items satisfy it
            for (const item of this) {
                if (!predicate(item)) return false;
            }
            return true;
        }
    };
}