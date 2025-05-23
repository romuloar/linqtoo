export function addTakeLinq() {
    Array.prototype.takeLinq = function <T>(this: T[], count: number): T[] {
        if (count <= 0) return [];
        return this.slice(0, count);
    };
}