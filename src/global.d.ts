interface ArrayConstructor {
    rangeLinq(start: number, count: number): number[];
    repeatLinq<T>(value: T, count: number): T[];
    emptyLinq<T>(): T[];
}

interface Array<T> {    
    aggregateLinq<U>(seed: U, func: (acc: U, item: T) => U): U;
    allLinq(predicate?: (item: T) => boolean): boolean;
    anyLinq(predicate?: (item: T) => boolean): boolean;
    appendLinq(value: T): T[];
    averageLinq(selector?: (item: T) => number): number;
    chunkLinq(size: number): T[][];
    concatLinq(other: T[]): T[];
    containsLinq(item: T): boolean;
    countLinq(predicate?: (item: T) => boolean): number;
    defaultIfEmptyLinq(defaultValue?: T): T[];
    distinctLinq(selector?: (item: T) => any): T[];
    distinctByLinq<TKey>(selector: (item: T) => TKey): T[];
    elementAtLinq(index: number): T | undefined;
    elementAtOrDefaultLinq(index: number, defaultValue?: T): T | undefined;
    exceptLinq(other: T[]): T[];
    firstLinq(predicate?: (item: T) => boolean): T | undefined;
    firstOrDefaultLinq(predicate?: (item: T) => boolean, defaultValue?: T): T | undefined;
    groupByLinq<K>(keySelector: (item: T) => K): Record<string, T[]>;
    intersectLinq(other: T[]): T[];
    joinLinq<U, R>(inner: U[], outerKeySelector: (item: T) => any, innerKeySelector: (item: U) => any, resultSelector: (outer: T, inner: U) => R): R[];
    lastLinq(predicate?: (item: T) => boolean): T | undefined;
    lastOrDefaultLinq(predicate?: (item: T) => boolean, defaultValue?: T): T | undefined;
    maxLinq(selector?: (item: T) => number): number | undefined;
    minLinq(selector?: (item: T) => number): number | undefined;
    orderByLinq<TKey>(keySelector: (item: T) => TKey): T[];
    orderByDescendingLinq<TKey>(keySelector: (item: T) => TKey): T[];    
    prependLinq(item: T): T[];
    reverseLinq(): T[];
    selectLinq<U>(selector: (item: T) => U): U[];
    selectManyLinq<U>(selector: (item: T) => U[]): U[];
    sequenceEqualLinq(other: T[], comparer?: (a: T, b: T) => boolean): boolean;
    singleLinq(predicate?: (item: T) => boolean): T;
    singleOrDefaultLinq(predicate?: (item: T) => boolean, defaultValue?: T): T | undefined;
    skipLinq(count: number): T[];
    skipWhileLinq(predicate: (item: T, index: number) => boolean): T[];
    sumLinq(this: number[], selector?: (item: number) => number): number;
    takeLinq(count: number): T[];
    takeWhileLinq(predicate: (item: T, index: number) => boolean): T[];
    thenByLinq<TKey>(keySelector: (item: T) => TKey): T[];
    thenByDescendingLinq<TKey>(keySelector: (item: T) => TKey): T[];
    unionLinq(other: T[], comparer?: (a: T, b: T) => boolean): T[];
    whereLinq(predicate: (item: T) => boolean): T[];
    zipLinq<U, R>(other: U[], resultSelector: (a: T, b: U) => R): R[]; 
}