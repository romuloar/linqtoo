export function addAll() {
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
}