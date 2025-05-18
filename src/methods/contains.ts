export function addContains() {
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
}