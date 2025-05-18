export function addOrderBy() {
if (!Array.prototype.orderBy) {
  Array.prototype.orderBy = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
	const result = this.slice();
	result.sort((a, b) => {
	  const keyA = keySelector(a);
	  const keyB = keySelector(b);
	  
	  if (keyA < keyB) return -1;
	  if (keyA > keyB) return 1;
	  return 0;
	});
	
	return result;
  };
}
}