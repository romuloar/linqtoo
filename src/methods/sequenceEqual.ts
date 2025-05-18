export function addSequenceEqual() {
  if (!Array.prototype.sequenceEqual) {
  Array.prototype.sequenceEqual = function<T>(second: T[], comparer?: (a: T, b: T) => boolean): boolean {
    if (this.length !== second.length) {
      return false;
    }
    
    if (!comparer) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] !== second[i]) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        if (!comparer(this[i], second[i])) {
          return false;
        }
      }
    }
    
    return true;
  };
}
}