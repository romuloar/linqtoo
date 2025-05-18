export function addConcatLt() {
  if (!Array.prototype.concatLt) {
    // Force que o tipo é: (...items: any[]) => any[]
    const originalConcat = Array.prototype.concat as (...items: any[]) => any[];

    Array.prototype.concatLt = function<T>(...items: any[]): T[] {
      return originalConcat.apply(this, items);
    };
  }
}