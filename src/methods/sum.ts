export function addSum() {
  if (!Array.prototype.sum) {
	  Array.prototype.sum = function<T>(selector?: (item: T) => number): number {
		if (this.length === 0) {
		  return 0;
		}
		
		let sum = 0;
		
		if (!selector) {
		  for (let i = 0; i < this.length; i++) {
			sum += Number(this[i]);
		  }
		} else {
		  for (let i = 0; i < this.length; i++) {
			sum += selector(this[i]);
		  }
		}
		
		return sum;
	  };
	}
}