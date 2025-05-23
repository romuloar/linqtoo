export function addEmptyLinq() {
    Array.emptyLinq = function <T>(): T[] {
        return [];
    };
}