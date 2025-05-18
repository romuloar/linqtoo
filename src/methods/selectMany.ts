export function addSelectMany() {
if (!Array.prototype.selectMany) {
  Array.prototype.selectMany = function<T, U>(selector: (item: T) => U[]): U[] {
    const result: U[] = [];
    for (let i = 0; i < this.length; i++) {
      const current = selector(this[i]);
      for (let j = 0; j < current.length; j++) {
        result.push(current[j]);
      }
    }
    return result;
  };
}
}