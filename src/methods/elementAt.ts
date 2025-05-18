export function addElementAt() {
	if (!Array.prototype.elementAt) {
  Array.prototype.elementAt = function<T>(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new Error("Index was out of range");
    }
    
    return this[index];
  };
}
}