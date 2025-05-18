export function addLast() {
 if (!Array.prototype.last) {
  Array.prototype.last = function<T>(predicate?: (item: T) => boolean): T {
    if (this.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    
    if (!predicate) {
      return this[this.length - 1];
    }
    
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i])) {
        return this[i];
      }
    }
    
    throw new Error("No element satisfies the condition");
  };
}
}