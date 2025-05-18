/**
 * linqtoo.ts - Biblioteca de extensões semelhantes ao LINQ para TypeScript
 */

// Interfaces para tipagem
interface IGrouping<TKey, TElement> {
  key: TKey;
  elements: TElement[];
}

declare global {
  interface Array<T> {
     select<U>(selector: (item: T, index: number) => U): U[];
     selectMany<U>(selector: (item: T) => U[]): U[];
     where(predicate: (item: T, index: number) => boolean): T[];
     any(predicate?: (item: T) => boolean): boolean;
     all(predicate: (item: T) => boolean): boolean;
     join<U, R>(inner: U[], outerKeySelector: (item: T) => any, innerKeySelector: (item: U) => any, resultSelector: (outer: T, inner: U) => R): R[];
     groupBy<TKey>(keySelector: (item: T) => TKey): IGrouping<TKey, T>[];
     orderBy<TKey>(keySelector: (item: T) => TKey): T[];
     orderByDescending<TKey>(keySelector: (item: T) => TKey): T[];
     thenBy<TKey>(keySelector: (item: T) => TKey): T[];
	 thenByDescending<TKey>(keySelector: (item: T) => TKey): T[];
     skip(count: number): T[];
     take(count: number): T[];
     first(predicate?: (item: T) => boolean): T;
     firstOrDefault(predicate?: (item: T) => boolean): T | null;
     last(predicate?: (item: T) => boolean): T;
     lastOrDefault(predicate?: (item: T) => boolean): T | null;
     single(predicate?: (item: T) => boolean): T;
     singleOrDefault(predicate?: (item: T) => boolean): T | null;
     contains(element: T, comparer?: (a: T, b: T) => boolean): boolean;
     intersect(second: T[], comparer?: (a: T, b: T) => boolean): T[];
     except(second: T[], comparer?: (a: T, b: T) => boolean): T[];
     distinct(comparer?: (a: T, b: T) => boolean): T[];
     union(second: T[], comparer?: (a: T, b: T) => boolean): T[];
     sequenceEqual(second: T[], comparer?: (a: T, b: T) => boolean): boolean;
     min(selector?: (item: T) => number): number;
     max(selector?: (item: T) => number): number;
     sum(selector?: (item: T) => number): number;
     average(selector?: (item: T) => number): number;
     aggregate<U>(func: (accumulate: U, item: T) => U, seed: U): U;
     reverse(): T[];
     count(predicate?: (item: T) => boolean): number;
     elementAt(index: number): T;
     elementAtOrDefault(index: number): T | null;
     defaultIfEmpty(defaultValue?: T): T[];
     zip<U, R>(second: U[], resultSelector: (first: T, second: U) => R): R[];
     concat(second: T[]): T[];
  }
}

// Implementações
if (!Array.prototype.select) {
  Array.prototype.select = function<T, U>(selector: (item: T, index: number) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < this.length; i++) {
      result.push(selector(this[i], i));
    }
    return result;
  };
}

if (!Array.prototype.selectMany) {
  Array.prototype.selectMany = function<T, U>(selector: (item: T) => U[]): U[] {
    const result: U[] = [];
    for (let i = 0; i < this.length; i++) {
      const current = selector(this[i]);
      for (let j = 0; j < current.length; j++) {
        result.push(current[j]);
      }
    }
    return result;
  };
}

if (!Array.prototype.where) {
  Array.prototype.where = function<T>(predicate: (item: T, index: number) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i], i)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

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

if (!Array.prototype.all) {
  Array.prototype.all = function<T>(predicate: (item: T) => boolean): boolean {
    if (this.length === 0) return true;
    
    for (let i = 0; i < this.length; i++) {
      if (!predicate(this[i])) {
        return false;
      }
    }
    return true;
  };
}

if (!Array.prototype.join) {
  Array.prototype.join = function<T, U, R>(
    inner: U[], 
    outerKeySelector: (item: T) => any, 
    innerKeySelector: (item: U) => any, 
    resultSelector: (outer: T, inner: U) => R
  ): R[] {
    const result: R[] = [];
    
    for (let i = 0; i < this.length; i++) {
      const outerElement = this[i];
      const outerKey = outerKeySelector(outerElement);
      
      for (let j = 0; j < inner.length; j++) {
        const innerElement = inner[j];
        const innerKey = innerKeySelector(innerElement);
        
        if (outerKey === innerKey) {
          result.push(resultSelector(outerElement, innerElement));
        }
      }
    }
    
    return result;
  };
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function<T, TKey>(keySelector: (item: T) => TKey): IGrouping<TKey, T>[] {
    const groups: Record<string, IGrouping<TKey, T>> = {};
    
    for (let i = 0; i < this.length; i++) {
      const item = this[i];
      const key = keySelector(item);
      const keyStr = String(key);
      
      if (!groups[keyStr]) {
        groups[keyStr] = { key, elements: [] };
      }
      groups[keyStr].elements.push(item);
    }
    
    const result: IGrouping<TKey, T>[] = [];
    for (const key in groups) {
      if (Object.prototype.hasOwnProperty.call(groups, key)) {
        result.push(groups[key]);
      }
    }
    
    return result;
  };
}

if (!Array.prototype.orderBy) {
  Array.prototype.orderBy = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
    const result = this.slice();
    result.sort((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);
      
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    
    return result;
  };
}

if (!Array.prototype.orderByDescending) {
  Array.prototype.orderByDescending = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
    const result = this.slice();
    result.sort((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);
      
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    
    return result;
  };
}

if (!Array.prototype.thenBy) {
  Array.prototype.thenBy = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
    return this.slice(); // Placeholder: a implementação real precisa manter estado de ordenação anterior
  };
}

if (!Array.prototype.thenByDescending) {
  Array.prototype.thenByDescending = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
    return this.slice(); // Placeholder: a implementação real precisa manter estado de ordenação anterior
  };
}

if (!Array.prototype.skip) {
  Array.prototype.skip = function<T>(count: number): T[] {
    if (count <= 0) return this.slice();
    return this.slice(count);
  };
}

if (!Array.prototype.take) {
  Array.prototype.take = function<T>(count: number): T[] {
    if (count <= 0) return [];
    return this.slice(0, count);
  };
}

if (!Array.prototype.first) {
  Array.prototype.first = function<T>(predicate?: (item: T) => boolean): T {
    if (this.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    
    if (!predicate) {
      return this[0];
    }
    
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        return this[i];
      }
    }
    
    throw new Error("No element satisfies the condition");
  };
}

if (!Array.prototype.firstOrDefault) {
  Array.prototype.firstOrDefault = function<T>(predicate?: (item: T) => boolean): T | null {
    if (this.length === 0) {
      return null;
    }
    
    if (!predicate) {
      return this[0];
    }
    
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        return this[i];
      }
    }
    
    return null;
  };
}

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

if (!Array.prototype.lastOrDefault) {
  Array.prototype.lastOrDefault = function<T>(predicate?: (item: T) => boolean): T | null {
    if (this.length === 0) {
      return null;
    }
    
    if (!predicate) {
      return this[this.length - 1];
    }
    
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i])) {
        return this[i];
      }
    }
    
    return null;
  };
}

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

if (!Array.prototype.contains) {
  Array.prototype.contains = function<T>(element: T, comparer?: (a: T, b: T) => boolean): boolean {
    if (!comparer) {
      return this.indexOf(element) !== -1;
    }
    
    for (let i = 0; i < this.length; i++) {
      if (comparer(this[i], element)) {
        return true;
      }
    }
    
    return false;
  };
}

if (!Array.prototype.intersect) {
  Array.prototype.intersect = function<T>(second: T[], comparer?: (a: T, b: T) => boolean): T[] {
    const result: T[] = [];
    
    if (!comparer) {
      for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (second.indexOf(item) !== -1 && result.indexOf(item) === -1) {
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
        
        if (inSecond && !inResult) {
          result.push(item);
        }
      }
    }
    
    return result;
  };
}

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

if (!Array.prototype.min) {
  Array.prototype.min = function<T>(selector?: (item: T) => number): number {
    if (this.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    
    let min: number;
    
    if (!selector) {
      min = Number(this[0]);
      for (let i = 1; i < this.length; i++) {
        const value = Number(this[i]);
        if (value < min) {
          min = value;
        }
      }
    } else {
      min = selector(this[0]);
      for (let i = 1; i < this.length; i++) {
        const value = selector(this[i]);
        if (value < min) {
          min = value;
        }
      }
    }
    
    return min;
  };
}

if (!Array.prototype.max) {
  Array.prototype.max = function<T>(selector?: (item: T) => number): number {
    if (this.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    
    let max: number;
    
    if (!selector) {
      max = Number(this[0]);
      for (let i = 1; i < this.length; i++) {
        const value = Number(this[i]);
        if (value > max) {
          max = value;
        }
      }
    } else {
      max = selector(this[0]);
      for (let i = 1; i < this.length; i++) {
        const value = selector(this[i]);
        if (value > max) {
          max = value;
        }
      }
    }
    
    return max;
  };
}

if (!Array.prototype.sum) {
  Array.prototype.sum = function<T>(selector?: (item: T) => number): number {
    if (this.length === 0) {
      return 0;
    }
    
    let sum = 0;
    
    if (!selector) {
      for (let i = 0; i < this.length; i++) {
        sum += Number(this[i]);
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        sum += selector(this[i]);
      }
    }
    
    return sum;
  };
}

if (!Array.prototype.average) {
  Array.prototype.average = function<T>(selector?: (item: T) => number): number {
    if (this.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    
    const sum = this.sum(selector);
    return sum / this.length;
  };
}

if (!Array.prototype.aggregate) {
  Array.prototype.aggregate = function<T, U>(func: (accumulate: U, item: T) => U, seed: U): U {
    let result = seed;
    
    for (let i = 0; i < this.length; i++) {
      result = func(result, this[i]);
    }
    
    return result;
  };
}

if (!Array.prototype.reverse) {
  const originalReverse = Array.prototype.reverse;
  Array.prototype.reverse = function<T>(): T[] {
    // Cria uma cópia antes de reverter para não modificar o array original
    const copy = this.slice();
    return originalReverse.call(copy);
  };
}

if (!Array.prototype.count) {
  Array.prototype.count = function<T>(predicate?: (item: T) => boolean): number {
    if (!predicate) {
      return this.length;
    }
    
    let count = 0;
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i])) {
        count++;
      }
    }
    
    return count;
  };
}

if (!Array.prototype.elementAt) {
  Array.prototype.elementAt = function<T>(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new Error("Index was out of range");
    }
    
    return this[index];
  };
}

if (!Array.prototype.elementAtOrDefault) {
  Array.prototype.elementAtOrDefault = function<T>(index: number): T | null {
    if (index < 0 || index >= this.length) {
      return null;
    }
    
    return this[index];
  };
}

if (!Array.prototype.defaultIfEmpty) {
  Array.prototype.defaultIfEmpty = function<T>(defaultValue?: T): T[] {
    if (this.length === 0) {
      return defaultValue !== undefined ? [defaultValue] : [null as unknown as T];
    }
    
    return this.slice();
  };
}

if (!Array.prototype.zip) {
  Array.prototype.zip = function<T, U, R>(second: U[], resultSelector: (first: T, second: U) => R): R[] {
    const length = Math.min(this.length, second.length);
    const result: R[] = [];
    
    for (let i = 0; i < length; i++) {
      result.push(resultSelector(this[i], second[i]));
    }
    
    return result;
  };
}

if (!Array.prototype.concat) {
  const originalConcat = Array.prototype.concat;
  Array.prototype.concat = function<T>(...items: any[]): T[] {
    return originalConcat.apply(this, items);
  };
}

export {};