export function addJoinLt() {
  if (!Array.prototype.joinLt) {
    Array.prototype.joinLt = function<T, U, R>(
      inner: U[],
      outerKeySelector: (item: T) => any,
      innerKeySelector: (item: U) => any,
      resultSelector: (outer: T, inner: U) => R
    ): R[] {
      const result: R[] = [];

      for (let i = 0; i < this.length; i++) {
        const outerElement = this[i];
        const outerKey = outerKeySelector(outerElement);

        for (let j = 0; j < inner.length; j++) {
          const innerElement = inner[j];
          const innerKey = innerKeySelector(innerElement);

          if (outerKey === innerKey) {
            result.push(resultSelector(outerElement, innerElement));
          }
        }
      }

      return result;
    };
  }
}