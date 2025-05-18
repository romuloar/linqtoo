export function addExcept() {
  if (!Array.prototype.except) {
  Array.prototype.except = function<T>(second: T[], comparer?: (a: T, b: T) => boolean): T[] {
    const result: T[] = [];
    
    if (!comparer) {
      for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (second.indexOf(item) === -1 && result.indexOf(item) === -1) {
          result.push(item);
        }
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        const item = this[i];
        
        // Verifica se item está na segunda coleção
        let inSecond = false;
        for (let j = 0; j < second.length; j++) {
          if (comparer(item, second[j])) {
            inSecond = true;
            break;
          }
        }
        
        // Verifica se item já está no resultado
        let inResult = false;
        for (let j = 0; j < result.length; j++) {
          if (comparer(item, result[j])) {
            inResult = true;
            break;
          }
        }
        
        if (!inSecond && !inResult) {
          result.push(item);
        }
      }
    }
    
    return result;
  };
}
}