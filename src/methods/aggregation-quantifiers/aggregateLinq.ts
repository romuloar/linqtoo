export function addAggregateLinq() {
    Array.prototype.aggregateLinq = function <T, U>(this: T[], seed: U, func: (acc: U, item: T) => U): U {
        let result = seed;
        for (const item of this) {
            result = func(result, item);
        }
        return result;
    };
}