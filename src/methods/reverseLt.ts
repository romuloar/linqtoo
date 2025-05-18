export function addReverseLt() {
  if (!Array.prototype.reverseLt) {
    Array.prototype.reverseLt = function<T>(): T[] {
      return this.slice().reverse();
    };
  }
}