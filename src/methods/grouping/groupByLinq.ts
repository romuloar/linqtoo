export function addGroupByLinq() {
    Array.prototype.groupByLinq = function <T, K>(this: T[], keySelector: (item: T) => K): Record<string, T[]> {
        return this.reduce((groups: Record<string, T[]>, item: T) => {
            const key = String(keySelector(item));
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    };
}