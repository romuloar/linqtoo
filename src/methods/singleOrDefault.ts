export function addSingleOrDefault() {
  if (!Array.prototype.singleOrDefault) {
  Array.prototype.singleOrDefault = function<T>(predicate?: (item: T) => boolean): T | null {
    if (this.length === 0) {
      return null;
    }
    
    if (!predicate) {
      if (this.length !== 1) {
        return null;
      }
      return this[0];
    }
    
    let found = false;
    let result: T | null = null;
    
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        if (found) {
          return null; // Mais de um elemento encontrado
        }
        found = true;
        result = this[i];
      }
    }
    
    return result;
  };
}
}