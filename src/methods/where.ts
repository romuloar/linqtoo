export function addWhere() {
  if (!Array.prototype.where) {
    Array.prototype.where = function<T>(this: T[], predicate: (item: T, index: number) => boolean): T[] {
      const result: T[] = [];
      for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
          result.push(this[i]);
        }
      }
      return result;
    };
  }
}