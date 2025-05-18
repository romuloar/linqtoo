export function addAny() {
  if (!Array.prototype.any) {
  Array.prototype.any = function<T>(predicate?: (item: T) => boolean): boolean {
    if (this.length === 0) return false;
    if (!predicate) return true;
    
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        return true;
      }
    }
    return false;
  };
}
}