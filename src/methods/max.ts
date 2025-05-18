export function addMax() {
  if (!Array.prototype.max) {
	  Array.prototype.max = function<T>(selector?: (item: T) => number): number {
		if (this.length === 0) {
		  throw new Error("Sequence contains no elements");
		}
		
		let max: number;
		
		if (!selector) {
		  max = Number(this[0]);
		  for (let i = 1; i < this.length; i++) {
			const value = Number(this[i]);
			if (value > max) {
			  max = value;
			}
		  }
		} else {
		  max = selector(this[0]);
		  for (let i = 1; i < this.length; i++) {
			const value = selector(this[i]);
			if (value > max) {
			  max = value;
			}
		  }
		}
		
		return max;
	  };
	}
}