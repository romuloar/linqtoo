export function addSkip() {
  if (!Array.prototype.skip) {
	  Array.prototype.skip = function<T>(count: number): T[] {
		if (count <= 0) return this.slice();
		return this.slice(count);
	  };
	}
}