export function addSingle() {
  if (!Array.prototype.single) {
  Array.prototype.single = function<T>(predicate?: (item: T) => boolean): T {
    if (this.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    
    if (!predicate) {
      if (this.length !== 1) {
        throw new Error("Sequence contains more than one element");
      }
      return this[0];
    }
    
    let found = false;
    let result: T | null = null;
    
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        if (found) {
          throw new Error("Sequence contains more than one matching element");
        }
        found = true;
        result = this[i];
      }
    }
    
    if (!found) {
      throw new Error("No element satisfies the condition");
    }
    
    return result as T;
  };
}
}