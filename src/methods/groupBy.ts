interface IGrouping<TKey, TElement> {
  key: TKey;
  elements: TElement[];
}

export function addGroupBy() {
	if (!Array.prototype.groupBy) {
	  Array.prototype.groupBy = function<T, TKey>(keySelector: (item: T) => TKey): IGrouping<TKey, T>[] {
		const groups: Record<string, IGrouping<TKey, T>> = {};
		
		for (let i = 0; i < this.length; i++) {
		  const item = this[i];
		  const key = keySelector(item);
		  const keyStr = String(key);
		  
		  if (!groups[keyStr]) {
			groups[keyStr] = { key, elements: [] };
		  }
		  groups[keyStr].elements.push(item);
		}
		
		const result: IGrouping<TKey, T>[] = [];
		for (const key in groups) {
		  if (Object.prototype.hasOwnProperty.call(groups, key)) {
			result.push(groups[key]);
		  }
		}
		
		return result;
	  };
	}
}