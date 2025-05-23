export function addMaxLinq() {
    Array.prototype.maxLinq = function <T>(this: T[], selector?: (item: T) => number): number | undefined {
        if (this.length === 0) return undefined;

        let maxValue: number | undefined = undefined;

        for (const item of this) {
            const value = selector ? selector(item) : (item as unknown as number);

            if (typeof value !== 'number') {
                throw new TypeError('All elements must be numbers or the selector must return a number.');
            }

            if (maxValue === undefined || value > maxValue) {
                maxValue = value;
            }
        }

        return maxValue;
    };
}