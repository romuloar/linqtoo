export function addSelect() {
  if (!Array.prototype.select) {
    Array.prototype.select = function<T, U>(this: T[], selector: (item: T, index: number) => U): U[] {
      const result: U[] = [];
      for (let i = 0; i < this.length; i++) {
        result.push(selector(this[i], i));  // passo o índice também
      }
      return result;
    };
  }
}