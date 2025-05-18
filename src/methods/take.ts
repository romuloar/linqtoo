export function addTake() {
  if (!Array.prototype.take) {
  Array.prototype.take = function<T>(count: number): T[] {
    if (count <= 0) return [];
    return this.slice(0, count);
  };
 }
}