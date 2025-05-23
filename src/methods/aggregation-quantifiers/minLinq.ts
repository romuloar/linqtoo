export function addMinLinq() {
    Array.prototype.minLinq = function <T>(this: T[], selector?: (item: T) => number): number | undefined {
        if (this.length === 0) return undefined;

        let minValue: number | undefined = undefined;

        for (const item of this) {
            const value = selector ? selector(item) : (item as unknown as number);

            if (typeof value !== 'number') {
                throw new TypeError('All elements must be numbers or a selector must return a number.');
            }

            if (minValue === undefined || value < minValue) {
                minValue = value;
            }
        }

        return minValue;
    };
}