export function addDefaultIfEmpty() {
	if (!Array.prototype.defaultIfEmpty) {
	  Array.prototype.defaultIfEmpty = function<T>(defaultValue?: T): T[] {
		if (this.length === 0) {
		  return defaultValue !== undefined ? [defaultValue] : [null as unknown as T];
		}
		
		return this.slice();
	  };
	}
}