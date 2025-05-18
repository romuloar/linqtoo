export function addUnion() {
  if (!Array.prototype.union) {
  Array.prototype.union = function<T>(second: T[], comparer?: (a: T, b: T) => boolean): T[] {
    const result = this.slice();
    
    if (!comparer) {
      for (let i = 0; i < second.length; i++) {
        const item = second[i];
        if (result.indexOf(item) === -1) {
          result.push(item);
        }
      }
    } else {
      for (let i = 0; i < second.length; i++) {
        const item = second[i];
        
        let exists = false;
        for (let j = 0; j < result.length; j++) {
          if (comparer(item, result[j])) {
            exists = true;
            break;
          }
        }
        
        if (!exists) {
          result.push(item);
        }
      }
    }
    
    return result;
  };
}
}