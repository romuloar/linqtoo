export function addElementAtOrDefaultLinq() {
    Array.prototype.elementAtOrDefaultLinq = function <T>(this: T[], index: number, defaultValue?: T): T | undefined {
        if (index < 0 || index >= this.length) {
            return defaultValue;
        }
        return this[index];
    };
}