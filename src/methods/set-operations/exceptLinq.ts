export function addExceptLinq() {
    Array.prototype.exceptLinq = function <T>(this: T[], other: T[]): T[] {
        if (!Array.isArray(other)) {
            throw new Error('Parameter must be an array');
        }
        return this.filter(item => !other.includes(item));
    };
}