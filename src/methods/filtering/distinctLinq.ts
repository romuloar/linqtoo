export function addDistinctLinq() {
    Array.prototype.distinctLinq = function <T>(this: T[], selector?: (item: T) => any): T[] {
        const seen = new Set();
        const result: T[] = [];

        for (const item of this) {
            const key = selector ? selector(item) : item;
            if (!seen.has(key)) {
                seen.add(key);
                result.push(item);
            }
        }

        return result;
    };
}