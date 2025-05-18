export function addThenByDescending() {
	if (!Array.prototype.thenByDescending) {
	  Array.prototype.thenByDescending = function<T, TKey>(keySelector: (item: T) => TKey): T[] {
		return this.slice(); // Placeholder: a implementação real precisa manter estado de ordenação anterior
	  };
	}
}