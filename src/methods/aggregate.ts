export function addAggregate() {
	if (!Array.prototype.aggregate) {
	  Array.prototype.aggregate = function<T, U>(func: (accumulate: U, item: T) => U, seed: U): U {
		let result = seed;
		
		for (let i = 0; i < this.length; i++) {
		  result = func(result, this[i]);
		}
		
		return result;
	  };
	}
}