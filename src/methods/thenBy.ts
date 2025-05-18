export function addThenBy() {
	if (!Array.prototype.thenBy) {
	  Array.prototype.thenBy = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
		return this.slice(); // Placeholder: a implementação real precisa manter estado de ordenação anterior
	  };
	}
}