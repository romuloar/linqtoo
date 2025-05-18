export function addLastOrDefault() {
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
}