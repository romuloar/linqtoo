export function addJoinLinq() {
    Array.prototype.joinLinq = function <T, U, R>(
        this: T[],
        inner: U[],
        outerKeySelector: (item: T) => any,
        innerKeySelector: (item: U) => any,
        resultSelector: (outer: T, inner: U) => R
    ): R[] {
        const result: R[] = [];
        const map = new Map<any, U[]>();

        for (const innerElement of inner) {
            const key = innerKeySelector(innerElement);
            if (!map.has(key)) {
                map.set(key, []);
            }
            map.get(key)!.push(innerElement);
        }

        for (const outerElement of this) {
            const key = outerKeySelector(outerElement);
            const matches = map.get(key);
            if (matches) {
                for (const innerElement of matches) {
                    result.push(resultSelector(outerElement, innerElement));
                }
            }
        }

        return result;
    };
}