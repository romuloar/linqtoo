export function addElementAtOrDefault() {
	if (!Array.prototype.elementAtOrDefault) {
	  Array.prototype.elementAtOrDefault = function<T>(index: number): T | null {
		if (index < 0 || index >= this.length) {
		  return null;
		}
		
		return this[index];
	  };
	}
}