export function addDistinct() {
  if (!Array.prototype.distinct) {
  Array.prototype.distinct = function<T>(comparer?: (a: T, b: T) => boolean): T[] {
    const result: T[] = [];
    
    if (!comparer) {
      for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (result.indexOf(item) === -1) {
          result.push(item);
        }
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        const item = this[i];
        
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