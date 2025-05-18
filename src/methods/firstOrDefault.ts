export function addFirstOrDefault() {
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
}