export function addFirst() {
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
}