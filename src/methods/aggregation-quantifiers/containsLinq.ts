export function addContainsLinq() {
	Array.prototype.containsLinq = function <T>(this: T[], item: T): boolean {
		return this.includes(item);
	};
}