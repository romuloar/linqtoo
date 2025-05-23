export function addChuckLinq() {
    Array.prototype.chunkLinq = function <T>(this: T[], size: number): T[][] {
        if (typeof size !== 'number' || size <= 0) {
            throw new Error("Size must be a positive number");
        }

        const result: T[][] = [];
        for (let i = 0; i < this.length; i += size) {
            result.push(this.slice(i, i + size));
        }
        return result;
    };
}