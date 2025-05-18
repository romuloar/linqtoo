export function addAverage() {
	if (!Array.prototype.average) {
	  Array.prototype.average = function<T>(selector?: (item: T) => number): number {
		if (this.length === 0) {
		  throw new Error("Sequence contains no elements");
		}
		
		const sum = this.sum(selector);
		return sum / this.length;
	  };
	}
}