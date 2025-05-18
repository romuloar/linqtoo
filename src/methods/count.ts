export function addCount() {
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
}