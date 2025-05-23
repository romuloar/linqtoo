export function addElementAtLinq() {
    Array.prototype.elementAtLinq = function <T>(this: T[], index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        return this[index];
    };
}