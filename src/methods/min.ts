export function addMin() {
  if (!Array.prototype.min) {
	  Array.prototype.min = function<T>(selector?: (item: T) => number): number {
		if (this.length === 0) {
		  throw new Error("Sequence contains no elements");
		}
		
		let min: number;
		
		if (!selector) {
		  min = Number(this[0]);
		  for (let i = 1; i < this.length; i++) {
			const value = Number(this[i]);
			if (value < min) {
			  min = value;
			}
		  }
		} else {
		  min = selector(this[0]);
		  for (let i = 1; i < this.length; i++) {
			const value = selector(this[i]);
			if (value < min) {
			  min = value;
			}
		  }
		}
		
		return min;
	  };
	}
}