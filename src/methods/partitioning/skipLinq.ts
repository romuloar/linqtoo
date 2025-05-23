export function addSkipLinq() {
    Array.prototype.skipLinq = function <T>(this: T[], count: number): T[] {
        if (count <= 0) return [...this];
        return this.slice(count);
    };
}