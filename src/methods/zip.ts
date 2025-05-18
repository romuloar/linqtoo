export function addZip() {
  if (!Array.prototype.zip) {
	  Array.prototype.zip = function<T, U, R>(second: U[], resultSelector: (first: T, second: U) => R): R[] {
		const length = Math.min(this.length, second.length);
		const result: R[] = [];
		
		for (let i = 0; i < length; i++) {
		  result.push(resultSelector(this[i], second[i]));
		}
		
		return result;
	  };
	}
}