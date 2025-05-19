# linqtoo

LINQ-like methods for JavaScript/TypeScript arrays.

[![NPM Version](https://img.shields.io/npm/v/linqtoo.svg)](https://www.npmjs.com/package/linqtoo)
[![License](https://img.shields.io/npm/l/linqtoo.svg)](https://github.com/romuloar/linqtoo/blob/master/LICENSE)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Available Methods](#available-methods)
  - [Working with Objects](#working-with-objects)
  - [Method Chaining](#method-chaining)
  - [TypeScript Support](#typescript-support)
- [API Reference](#api-reference)
  - [Filtering Methods](#filtering-methods)
  - [Projection Methods](#projection-methods)
  - [Sorting Methods](#sorting-methods)
  - [Aggregation Methods](#aggregation-methods)
  - [Element Methods](#element-methods)
  - [Set Methods](#set-methods)
  - [Conversion Methods](#conversion-methods)
  - [Other Methods](#other-methods)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install linqtoo
```

## Usage

### Basic Usage

```javascript
// Import the library
import 'linqtoo';

// Use LINQ methods directly on arrays
const numbers = [1, 2, 3, 4, 5];

// Filter even numbers
const evenNumbers = numbers.where(x => x % 2 === 0).toArray();
console.log(evenNumbers); // [2, 4]
```

### Available Methods

linqtoo extends JavaScript arrays with C#-like LINQ methods:

```javascript
import 'linqtoo';

const numbers = [1, 2, 3, 4, 5];

// Filtering
const greaterThanTwo = numbers.where(x => x > 2).toArray();
console.log(greaterThanTwo); // [3, 4, 5]

// Projection
const doubled = numbers.select(x => x * 2).toArray();
console.log(doubled); // [2, 4, 6, 8, 10]

// Sorting
const sorted = numbers.orderByDescending(x => x).toArray();
console.log(sorted); // [5, 4, 3, 2, 1]

// Aggregation
const sum = numbers.sum();
console.log(sum); // 15

const average = numbers.average();
console.log(average); // 3
```

### Working with Objects

```javascript
import 'linqtoo';

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 20 }
];

// Filter by age
const adults = people.where(p => p.age >= 21).toArray();
console.log(adults); // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]

// Sort by name
const sortedByName = people.orderBy(p => p.name).toArray();
console.log(sortedByName);
// [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, { name: 'Charlie', age: 20 }]

// Project to new objects
const names = people.select(p => p.name).toArray();
console.log(names); // ['Alice', 'Bob', 'Charlie']
```

### Method Chaining

```javascript
import 'linqtoo';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chain multiple operations
const result = numbers
  .where(x => x % 2 === 0)      // Get even numbers
  .select(x => x * 3)           // Multiply by 3
  .orderByDescending(x => x)    // Sort in descending order
  .take(2)                      // Take first 2 items
  .toArray();                   // Convert to array

console.log(result); // [30, 24]
```

### TypeScript Support

```typescript
import 'linqtoo';

interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 20 }
];

// Types are preserved throughout the chain
const adultNames: string[] = people
  .where(p => p.age >= 21)
  .select(p => p.name)
  .toArray();

console.log(adultNames); // ['Alice', 'Bob']
```

## API Reference

### Filtering Methods

#### `where(predicate: (item: T, index: number) => boolean)`
- Filters a sequence based on a predicate function.
- Returns a new sequence containing elements that satisfy the condition.

```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.where(x => x % 2 === 0).toArray(); // [2, 4]
```

### Projection Methods

#### `select(selector: (item: T, index: number) => U)`
- Projects each element into a new form.
- Returns a new sequence containing transformed elements.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.select(x => x * 2).toArray(); // [2, 4, 6]
```

#### `selectMany(selector: (item: T, index: number) => U[])`
- Projects each element to a sequence and flattens the resulting sequences into one sequence.
- Returns a new flattened sequence.

```javascript
const families = [
  { name: 'Smith', members: ['John', 'Jane'] },
  { name: 'Doe', members: ['Sam', 'Lucy'] }
];
const allMembers = families.selectMany(f => f.members).toArray(); // ['John', 'Jane', 'Sam', 'Lucy']
```

### `sequenceEqual`

Determines whether two sequences are equal by comparing their elements.

**Examples:**

```typescript
// Example 1: Compare two collections of numbers
const first = [1, 2, 3];
const second = [1, 2, 3];
const isEqual = first.sequenceEqual(second);
console.log(isEqual); // true

// Example 2: Compare with custom comparer
const users1 = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
const users2 = [{id: 1, name: "Alice (copy)"}, {id: 2, name: "Bob (copy)"}];
const areEqual = users1.sequenceEqual(users2, (a, b) => a.id === b.id);
console.log(areEqual); // true
```

### Sorting Methods

#### `orderBy(keySelector: (item: T) => K)`
- Sorts elements in ascending order based on a key.
- Returns a new sequence sorted by the specified key.

```javascript
const people = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 }
];
const byName = people.orderBy(p => p.name).toArray(); // Alice first, then Bob
```

#### `orderByDescending(keySelector: (item: T) => K)`
- Sorts elements in descending order based on a key.
- Returns a new sequence sorted by the specified key in descending order.

```javascript
const numbers = [1, 3, 2, 5, 4];
const descending = numbers.orderByDescending(x => x).toArray(); // [5, 4, 3, 2, 1]
```

#### `thenBy(keySelector: (item: T) => K)`
- Performs a secondary sort in ascending order.
- Must follow `orderBy` or `orderByDescending`.

```javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 20 }
];
const sorted = people
  .orderBy(p => p.name)
  .thenBy(p => p.age)
  .toArray();
// [{ name: 'Alice', age: 20 }, { name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
```

#### `thenByDescending(keySelector: (item: T) => K)`
- Performs a secondary sort in descending order.
- Must follow `orderBy` or `orderByDescending`.

```javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 20 }
];
const sorted = people
  .orderBy(p => p.name)
  .thenByDescending(p => p.age)
  .toArray();
// [{ name: 'Alice', age: 25 }, { name: 'Alice', age: 20 }, { name: 'Bob', age: 30 }]
```

### Aggregation Methods

#### `count(predicate?: (item: T) => boolean)`
- Returns the number of elements in a sequence, optionally filtered by a predicate.

```javascript
const numbers = [1, 2, 3, 4, 5];
const count = numbers.count(); // 5
const evenCount = numbers.count(x => x % 2 === 0); // 2
```

### `defaultIfEmpty`

Returns the elements of the sequence or a default value in a sequence if the sequence is empty.

**Examples:**

```typescript
// Example 1: Non-empty collection returns its own elements
const numbers = [1, 2, 3];
const result1 = numbers.defaultIfEmpty(0);
console.log(result1); // [1, 2, 3]

// Example 2: Empty collection returns the default value
const empty = number[];
const result2 = empty.defaultIfEmpty(0);
console.log(result2); // [0]
```

#### `sum(selector?: (item: T) => number)`
- Computes the sum of a sequence of numeric values.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.sum(); // 15

const people = [{ age: 25 }, { age: 30 }];
const totalAge = people.sum(p => p.age); // 55
```

#### `average(selector?: (item: T) => number)`
- Computes the average of a sequence of numeric values.

```javascript
const numbers = [1, 2, 3, 4, 5];
const avg = numbers.average(); // 3

const people = [{ age: 25 }, { age: 30 }];
const avgAge = people.average(p => p.age); // 27.5
```

### `concatLt`

Concatenates two sequences.

**Examples:**

```typescript
// Example 1: Concatenate two collections of numbers
const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = first.concatLt(second);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Example 2: Concatenate arrays of different types
const numbers = [1, 2, 3];
const moreNumbers = [4, 5, 6];
const allNumbers = numbers.concatLt(moreNumbers);
console.log(allNumbers); // [1, 2, 3, 4, 5, 6]

```

#### min(selector?: (item: T) => number)`
- Returns the minimum value in a sequence.

```javascript
const numbers = [5, 3, 1, 4, 2];
const min = numbers.min(); // 1

const people = [{ age: 25 }, { age: 30 }, { age: 20 }];
const youngest = people.min(p => p.age); // 20
```

#### `max(selector?: (item: T) => number)`
- Returns the maximum value in a sequence.

```javascript
const numbers = [5, 3, 1, 4, 2];
const max = numbers.max(); // 5

const people = [{ age: 25 }, { age: 30 }, { age: 20 }];
const oldest = people.max(p => p.age); // 30
```

### Element Methods

#### `first(predicate?: (item: T) => boolean)`
- Returns the first element in a sequence, or the first element that satisfies a condition.
- Throws an error if no matching element exists.

```javascript
const numbers = [1, 2, 3, 4, 5];
const first = numbers.first(); // 1
const firstEven = numbers.first(x => x % 2 === 0); // 2
```

#### `firstOrDefault(predicate?: (item: T) => boolean, defaultValue?: T)`
- Returns the first element in a sequence, or the first element that satisfies a condition.
- Returns the default value if no matching element exists.

```javascript
const numbers = [1, 2, 3, 4, 5];
const firstOrDefault = numbers.firstOrDefault(); // 1

const empty = [];
const emptyFirstOrDefault = empty.firstOrDefault(null, 0); // 0

const firstGreaterThan10 = numbers.firstOrDefault(x => x > 10, 0); // 0
```

#### `last(predicate?: (item: T) => boolean)`
- Returns the last element in a sequence, or the last element that satisfies a condition.
- Throws an error if no matching element exists.

```javascript
const numbers = [1, 2, 3, 4, 5];
const last = numbers.last(); // 5
const lastEven = numbers.last(x => x % 2 === 0); // 4
```

#### `lastOrDefault(predicate?: (item: T) => boolean, defaultValue?: T)`
- Returns the last element in a sequence, or the last element that satisfies a condition.
- Returns the default value if no matching element exists.

```javascript
const numbers = [1, 2, 3, 4, 5];
const lastOrDefault = numbers.lastOrDefault(); // 5

const empty = [];
const emptyLastOrDefault = empty.lastOrDefault(null, 0); // 0

const lastGreaterThan10 = numbers.lastOrDefault(x => x > 10, 0); // 0
```

#### `elementAt(index: number)`
- Returns the element at a specified index in a sequence.
- Throws an error if the index is out of range.

```javascript
const numbers = [1, 2, 3, 4, 5];
const third = numbers.elementAt(2); // 3
```

#### `elementAtOrDefault(index: number, defaultValue?: T)`
- Returns the element at a specified index in a sequence.
- Returns the default value if the index is out of range.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sixth = numbers.elementAtOrDefault(5, 0); // 0
```

#### `single(predicate?: (item: T) => boolean)`
- Returns the only element in a sequence, or the only element that satisfies a condition.
- Throws an error if no matching element exists or if more than one matching element exists.

```javascript
const numbers = [42];
const single = numbers.single(); // 42

const multipleNumbers = [1, 2, 3, 4, 5];
const singleEven = multipleNumbers.single(x => x === 4); // 4
```

#### `singleOrDefault(predicate?: (item: T) => boolean, defaultValue?: T)`
- Returns the only element in a sequence, or the only element that satisfies a condition.
- Returns the default value if no matching element exists.
- Throws an error if more than one matching element exists.

```javascript
const numbers = [42];
const single = numbers.singleOrDefault(); // 42

const empty = [];
const emptySingleOrDefault = empty.singleOrDefault(null, 0); // 0
```

### Set Methods

#### `distinct(keySelector?: (item: T) => K)`
- Returns distinct elements from a sequence.
- Uses an optional key selector to determine uniqueness.

```javascript
const numbers = [1, 2, 2, 3, 3, 3];
const distinct = numbers.distinct().toArray(); // [1, 2, 3]

const people = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
];
const distinctById = people.distinct(p => p.id).toArray(); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

#### `union(second: T[], keySelector?: (item: T) => K)`
- Produces the set union of two sequences.
- Uses an optional key selector to determine uniqueness.

```javascript
const first = [1, 2, 3];
const second = [3, 4, 5];
const union = first.union(second).toArray(); // [1, 2, 3, 4, 5]
```

#### `intersect(second: T[], keySelector?: (item: T) => K)`
- Produces the set intersection of two sequences.
- Uses an optional key selector to determine equality.

```javascript
const first = [1, 2, 3];
const second = [3, 4, 5];
const intersect = first.intersect(second).toArray(); // [3]
```

#### `except(second: T[], keySelector?: (item: T) => K)`
- Produces the set difference of two sequences.
- Uses an optional key selector to determine equality.

```javascript
const first = [1, 2, 3];
const second = [3, 4, 5];
const except = first.except(second).toArray(); // [1, 2]
```

### Other Methods

#### `take(count: number)`
- Returns a specified number of contiguous elements from the start of a sequence.

```javascript
const numbers = [1, 2, 3, 4, 5];
const firstThree = numbers.take(3).toArray(); // [1, 2, 3]
```

#### `takeWhile(predicate: (item: T, index: number) => boolean)`
- Returns elements from a sequence as long as a specified condition is true.

```javascript
const numbers = [1, 2, 3, 4, 5];
const lessThanFour = numbers.takeWhile(x => x < 4).toArray(); // [1, 2, 3]
```

#### `skip(count: number)`
- Bypasses a specified number of elements in a sequence and then returns the remaining elements.

```javascript
const numbers = [1, 2, 3, 4, 5];
const skipTwo = numbers.skip(2).toArray(); // [3, 4, 5]
```

#### `skipWhile(predicate: (item: T, index: number) => boolean)`
- Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.

```javascript
const numbers = [1, 2, 3, 4, 5, 1];
const skipLessThanThree = numbers.skipWhile(x => x < 3).toArray(); // [3, 4, 5, 1]
```

#### `groupBy(keySelector: (item: T) => K, valueSelector?: (item: T) => V)`
- Groups elements by key.
- Uses a key selector to extract keys and an optional value selector to extract values.

```javascript
const people = [
  { age: 30, name: 'Alice' },
  { age: 25, name: 'Bob' },
  { age: 30, name: 'Charlie' }
];
const groups = people.groupBy(p => p.age).toArray();
/*
[
  { key: 30, values: [{ age: 30, name: 'Alice' }, { age: 30, name: 'Charlie' }] },
  { key: 25, values: [{ age: 25, name: 'Bob' }] }
]
*/
```

#### `join(inner: U[], outerKeySelector: (item: T) => K, innerKeySelector: (item: U) => K, resultSelector: (outer: T, inner: U) => R)`
- Correlates the elements of two sequences based on matching keys.

```javascript
const customers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
const orders = [
  { customerId: 1, product: 'Apple' },
  { customerId: 2, product: 'Banana' },
  { customerId: 1, product: 'Orange' }
];
const customerOrders = customers.join(
  orders,
  c => c.id,
  o => o.customerId,
  (customer, order) => ({ customerName: customer.name, product: order.product })
).toArray();
/*
[
  { customerName: 'Alice', product: 'Apple' },
  { customerName: 'Alice', product: 'Orange' },
  { customerName: 'Bob', product: 'Banana' }
]
*/
```

#### `any(predicate?: (item: T) => boolean)`
- Determines whether any element of a sequence satisfies a condition.

```javascript
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.any(x => x % 2 === 0); // true
const hasNegative = numbers.any(x => x < 0); // false
```

#### `all(predicate: (item: T) => boolean)`
- Determines whether all elements of a sequence satisfy a condition.

```javascript
const numbers = [1, 2, 3, 4, 5];
const allPositive = numbers.all(x => x > 0); // true
const allEven = numbers.all(x => x % 2 === 0); // false
```

#### `contains(value: T | ((item: T) => boolean))`
- Determines whether a sequence contains a specified element.

```javascript
const numbers = [1, 2, 3, 4, 5];
const containsThree = numbers.contains(3); // true
const containsTen = numbers.contains(10); // false
```

#### `aggregate(seed: U, func: (acc: U, item: T) => U)`
- Applies an accumulator function over a sequence.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.aggregate(0, (acc, x) => acc + x); // 15
const product = numbers.aggregate(1, (acc, x) => acc * x); // 120
```

#### `reverseLt()`
- Inverts the order of the elements in a sequence.

```javascript
const numbers = [1, 2, 3, 4, 5];
const reversed = numbers.reverseLt(); // [5, 4, 3, 2, 1]
```

### `zip`

Applies a function to corresponding elements of two sequences, producing a sequence of results.

**Examples:**

```typescript
// Example 1: Combine two collections of numbers
const first = [1, 2, 3];
const second = [4, 5, 6];
const zipped = first.zip(second, (a, b) => a + b);
console.log(zipped); // [5, 7, 9]

// Example 2: Combine first and last names
const firstNames = ["Alice", "Bob", "Carol"];
const lastNames = ["Smith", "Johnson", "Williams"];
const fullNames = firstNames.zip(lastNames, (first, last) => `${first} ${last}`);
console.log(fullNames);
// ["Alice Smith", "Bob Johnson", "Carol Williams"]
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Romulo Ribeiro
