export function addDistinctByLinq() {
    Array.prototype.distinctByLinq = function <T, TKey>(this: T[], selector: (item: T) => TKey): T[] {
        const seen = new Set<TKey>();
        const result: T[] = [];

        for (const item of this) {
            const key = selector(item);
            if (!seen.has(key)) {
                seen.add(key);
                result.push(item);
            }
        }

        return result;
    };
}