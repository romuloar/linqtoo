# LinqToo

A TypeScript library that implements C#'s LINQ methods for collection manipulation.

## Installation

```bash
npm install linqtoo
```

## Basic Usage

```typescript
import { Collection } from 'linqtoo';

// Create a collection from an array
const numbers = new Collection([1, 2, 3, 4, 5]);

// Use LINQ methods
const evenNumbers = numbers.where(x => x % 2 === 0).toArray();
console.log(evenNumbers); // [2, 4]
```

## Available Methods

### `aggregate`

Applies an accumulator function over a sequence.

**Examples:**

```typescript
// Example 1: Sum all numbers
const numbers = new Collection([1, 2, 3, 4]);
const sum = numbers.aggregate((acc, val) => acc + val);
console.log(sum); // 10

// Example 2: Concatenate strings with separator
const words = new Collection(["hello", "world", "linq"]);
const sentence = words.aggregate((acc, val) => acc + " " + val, "");
console.log(sentence.trim()); // "hello world linq"
```

### `all`

Determines whether all elements of a sequence satisfy a condition.

**Examples:**

```typescript
// Example 1: Check if all numbers are positive
const numbers = new Collection([1, 2, 3, 4]);
const allPositive = numbers.all(x => x > 0);
console.log(allPositive); // true

// Example 2: Check if all numbers are even
const evenCheck = numbers.all(x => x % 2 === 0);
console.log(evenCheck); // false
```

### `any`

Determines whether any element of a sequence satisfies a condition.

**Examples:**

```typescript
// Example 1: Check if there is any even number
const numbers = new Collection([1, 2, 3, 4]);
const hasEven = numbers.any(x => x % 2 === 0);
console.log(hasEven); // true

// Example 2: Check if there is any number greater than 10
const hasLarge = numbers.any(x => x > 10);
console.log(hasLarge); // false
```

### `average`

Calculates the average of the values in the sequence.

**Examples:**

```typescript
// Example 1: Average of a collection of numbers
const numbers = new Collection([2, 4, 6, 8]);
const avg = numbers.average();
console.log(avg); // 5

// Example 2: Average age of a collection of people
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 35 }
]);
const avgAge = people.average(p => p.age);
console.log(avgAge); // 30
```

### `concatLt`

Concatenates two sequences.

**Examples:**

```typescript
// Example 1: Concatenate two collections of numbers
const first = new Collection([1, 2, 3]);
const second = new Collection([4, 5, 6]);
const combined = first.concatLt(second);
console.log(combined.toArray()); // [1, 2, 3, 4, 5, 6]

// Example 2: Concatenate arrays of different types
const numbers = new Collection([1, 2, 3]);
const moreNumbers = [4, 5, 6];
const allNumbers = numbers.concatLt(moreNumbers);
console.log(allNumbers.toArray()); // [1, 2, 3, 4, 5, 6]
```

### `contains`

Determines whether a sequence contains a specified element.

**Examples:**

```typescript
// Example 1: Check if a collection contains a number
const numbers = new Collection([1, 2, 3, 4, 5]);
const hasThree = numbers.contains(3);
console.log(hasThree); // true

// Example 2: Check with a custom comparer
const people = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const hasBob = people.contains({id: 2, name: "Bob"}, (a, b) => a.id === b.id);
console.log(hasBob); // true
```

### `count`

Returns the number of elements in a sequence.

**Examples:**

```typescript
// Example 1: Count all elements
const numbers = new Collection([1, 2, 3, 4, 5]);
const total = numbers.count();
console.log(total); // 5

// Example 2: Count elements that satisfy a condition
const evenCount = numbers.count(x => x % 2 === 0);
console.log(evenCount); // 2
```

### `defaultIfEmpty`

Returns the elements of the sequence or a default value in a sequence if the sequence is empty.

**Examples:**

```typescript
// Example 1: Non-empty collection returns its own elements
const numbers = new Collection([1, 2, 3]);
const result1 = numbers.defaultIfEmpty(0);
console.log(result1.toArray()); // [1, 2, 3]

// Example 2: Empty collection returns the default value
const empty = new Collection<number>([]);
const result2 = empty.defaultIfEmpty(0);
console.log(result2.toArray()); // [0]
```

### `distinct`

Returns distinct elements from a sequence.

**Examples:**

```typescript
// Example 1: Distinct numbers
const numbers = new Collection([1, 2, 2, 3, 3, 3, 4, 5, 5]);
const distinctNumbers = numbers.distinct();
console.log(distinctNumbers.toArray()); // [1, 2, 3, 4, 5]

// Example 2: Distinct objects based on a property
const users = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice (duplicate)" }
]);
const distinctUsers = users.distinct(user => user.id);
console.log(distinctUsers.toArray()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

### `elementAt`

Returns the element at a specified index.

**Examples:**

```typescript
// Example 1: Get the third element
const letters = new Collection(["a", "b", "c", "d", "e"]);
const thirdLetter = letters.elementAt(2);
console.log(thirdLetter); // "c"

// Example 2: Try to get an element out of bounds
try {
  const outOfBounds = letters.elementAt(10);
} catch (e) {
  console.log("Error caught: index out of bounds");
}
```

### `elementAtOrDefault`

Returns the element at a specified index or a default value if the index is out of range.

**Examples:**

```typescript
// Example 1: Get the third element
const letters = new Collection(["a", "b", "c", "d", "e"]);
const thirdLetter = letters.elementAtOrDefault(2);
console.log(thirdLetter); // "c"

// Example 2: Out of bounds index returns default value
const outOfBounds = letters.elementAtOrDefault(10, "z");
console.log(outOfBounds); // "z"
```

### `except`

Produces the set difference of two sequences.

**Examples:**

```typescript
// Example 1: Remove specific numbers
const numbers = new Collection([1, 2, 3, 4, 5]);
const toRemove = [2, 4];
const result = numbers.except(toRemove);
console.log(result.toArray()); // [1, 3, 5]

// Example 2: Difference between collections with custom comparer
const users1 = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const users2 = [{id: 2, name: "Bob"}, {id: 3, name: "Carol"}];
const uniqueUsers = users1.except(users2, (a, b) => a.id === b.id);
console.log(uniqueUsers.toArray()); // [{id: 1, name: "Alice"}]
```

### `first`

Returns the first element of a sequence.

**Examples:**

```typescript
// Example 1: Get the first element
const numbers = new Collection([1, 2, 3, 4, 5]);
const first = numbers.first();
console.log(first); // 1

// Example 2: Get the first element that satisfies a condition
const firstEven = numbers.first(x => x % 2 === 0);
console.log(firstEven); // 2
```

### `firstOrDefault`

Returns the first element of the sequence or a default value if the sequence is empty.

**Examples:**

```typescript
// Example 1: Get the first element of a non-empty collection
const numbers = new Collection([1, 2, 3, 4, 5]);
const first = numbers.firstOrDefault(null);
console.log(first); // 1

// Example 2: Get the first element that satisfies a condition or a default value
const firstBigNumber = numbers.firstOrDefault(null, x => x > 10);
console.log(firstBigNumber); // null (no number is greater than 10)
```

### `groupBy`

Groups elements according to a specified key.

**Examples:**

```typescript
// Example 1: Group numbers by parity
const numbers = new Collection([1, 2, 3, 4, 5, 6]);
const grouped = numbers.groupBy(n => n % 2 === 0 ? "even" : "odd");
console.log(grouped.toArray());
// [
//   { key: "odd", values: [1, 3, 5] },
//   { key: "even", values: [2, 4, 6] }
// ]

// Example 2: Group people by name initial
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Anna", age: 35 },
  { name: "Charlie", age: 40 }
]);
const byInitial = people.groupBy(p => p.name[0]);
console.log(byInitial.toArray());
// [
//   { key: "A", values: [{ name: "Alice", age: 25 }, { name: "Anna", age: 35 }] },
//   { key: "B", values: [{ name: "Bob", age: 30 }] },
//   { key: "C", values: [{ name: "Charlie", age: 40 }] }
// ]
```

### `intersect`

Produces the set intersection of two sequences.

**Examples:**

```typescript
// Example 1: Find common numbers between two collections
const first = new Collection([1, 2, 3, 4, 5]);
const second = [3, 4, 5, 6, 7];
const common = first.intersect(second);
console.log(common.toArray()); // [3, 4, 5]

// Example 2: Intersection of objects with custom comparer
const users1 = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
]);
const users2 = [
  { id: 2, name: "Bob (new)" },
  { id: 3, name: "Carol (new)" },
  { id: 4, name: "Dave" }
];
const commonUsers = users1.intersect(users2, (a, b) => a.id === b.id);
console.log(commonUsers.toArray()); // [{ id: 2, name: "Bob" }, { id: 3, name: "Carol" }]
```

### `join`

Correlates elements of two sequences based on matching keys.

**Examples:**

```typescript
// Example 1: Join products with categories
const categories = new Collection([
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" }
]);

const products = [
  { categoryId: 1, name: "Laptop" },
  { categoryId: 1, name: "Smartphone" },
  { categoryId: 2, name: "TypeScript Practical Guide" },
  { categoryId: 3, name: "Sneakers" } // Category that doesn't exist
];

const productsWithCategory = categories.join(
  products,
  cat => cat.id,
  prod => prod.categoryId,
  (cat, prod) => ({
    product: prod.name,
    category: cat.name
  })
);

console.log(productsWithCategory.toArray());
// [
//   { product: "Laptop", category: "Electronics" },
//   { product: "Smartphone", category: "Electronics" },
//   { product: "TypeScript Practical Guide", category: "Books" }
// ]

// Example 2: Join students and their grades
const students = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
]);

const grades = [
  { studentId: 1, course: "Math", grade: 90 },
  { studentId: 1, course: "Science", grade: 85 },
  { studentId: 2, course: "Math", grade: 80 },
  { studentId: 2, course: "Science", grade: 95 }
];

const studentGrades = students.join(
  grades,
  student => student.id,
  grade => grade.studentId,
  (student, grade) => ({
    student: student.name,
    course: grade.course,
    grade: grade.grade
  })
);

console.log(studentGrades.toArray());
// [
//   { student: "Alice", course: "Math", grade: 90 },
//   { student: "Alice", course: "Science", grade: 85 },
//   { student: "Bob", course: "Math", grade: 80 },
//   { student: "Bob", course: "Science", grade: 95 }
// ]
```

### `last`

Returns the last element of a sequence.

**Examples:**

```typescript
// Example 1: Get the last element
const numbers = new Collection([1, 2, 3, 4, 5]);
const last = numbers.last();
console.log(last); // 5

// Example 2: Get the last element that satisfies a condition
const lastEven = numbers.last(x => x % 2 === 0);
console.log(lastEven); // 4
```

### `lastOrDefault`

Returns the last element of the sequence or a default value if the sequence is empty.

**Examples:**

```typescript
// Example 1: Get the last element of a non-empty collection
const numbers = new Collection([1, 2, 3, 4, 5]);
const last = numbers.lastOrDefault(0);
console.log(last); // 5

// Example 2: Get the last element that satisfies a condition or a default value
const lastBigNumber = numbers.lastOrDefault(0, x => x > 10);
console.log(lastBigNumber); // 0 (no number is greater than 10)
```

### `max`

Returns the maximum value in a sequence.

**Examples:**

```typescript
// Example 1: Find the largest number
const numbers = new Collection([1, 5, 3, 9, 2]);
const max = numbers.max();
console.log(max); // 9

// Example 2: Find the oldest person
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const oldestAge = people.max(p => p.age);
console.log(oldestAge); // 40
```

### `min`

Returns the minimum value in a sequence.

**Examples:**

```typescript
// Example 1: Find the smallest number
const numbers = new Collection([5, 3, 9, 1, 2]);
const min = numbers.min();
console.log(min); // 1

// Example 2: Find the youngest person
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const youngestAge = people.min(p => p.age);
console.log(youngestAge); // 25
```

### `orderBy`

Sorts the elements of a sequence in ascending order.

**Examples:**

```typescript
// Example 1: Sort numbers
const numbers = new Collection([5, 3, 9, 1, 2]);
const ordered = numbers.orderBy(x => x);
console.log(ordered.toArray()); // [1, 2, 3, 5, 9]

// Example 2: Sort people by age
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const byAge = people.orderBy(p => p.age);
console.log(byAge.toArray());
// [
//   { name: "Alice", age: 25 },
//   { name: "Carol", age: 35 },
//   { name: "Bob", age: 40 }
// ]
```

### `orderByDescending`

Sorts the elements of a sequence in descending order.

**Examples:**

```typescript
// Example 1: Sort numbers in descending order
const numbers = new Collection([5, 3, 9, 1, 2]);
const descendingOrder = numbers.orderByDescending(x => x);
console.log(descendingOrder.toArray()); // [9, 5, 3, 2, 1]

// Example 2: Sort people by age in descending order
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const byAgeDesc = people.orderByDescending(p => p.age);
console.log(byAgeDesc.toArray());
// [
//   { name: "Bob", age: 40 },
//   { name: "Carol", age: 35 },
//   { name: "Alice", age: 25 }
// ]
```

### `reverseLt`

Inverts the order of the elements in a sequence.

**Examples:**

```typescript
// Example 1: Reverse a collection of numbers
const numbers = new Collection([1, 2, 3, 4, 5]);
const reversed = numbers.reverseLt();
console.log(reversed.toArray()); // [5, 4, 3, 2, 1]

// Example 2: Reverse a collection of strings
const words = new Collection(["first", "second", "third"]);
const reversedWords = words.reverseLt();
console.log(reversedWords.toArray()); // ["third", "second", "first"]
```

### `select`

Projects each element of a sequence into a new form.

**Examples:**

```typescript
// Example 1: Double each number
const numbers = new Collection([1, 2, 3, 4]);
const doubled = numbers.select(x => x * 2);
console.log(doubled.toArray()); // [2, 4, 6, 8]

// Example 2: Extract specific properties from objects
const people = new Collection([
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "Boston" }
]);
const simpleView = people.select(p => ({ name: p.name, age: p.age }));
console.log(simpleView.toArray());
// [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 30 }
// ]
```

### `selectMany`

Projects each element of a sequence to a new sequence and flattens the result.

**Examples:**

```typescript
// Example 1: Convert array of arrays into a single flat array
const arrays = new Collection([[1, 2], [3, 4], [5, 6]]);
const flattened = arrays.selectMany(arr => arr);
console.log(flattened.toArray()); // [1, 2, 3, 4, 5, 6]

// Example 2: Get all tags from a list of articles
const articles = new Collection([
  { title: "TypeScript Basics", tags: ["typescript", "programming"] },
  { title: "LINQ in TypeScript", tags: ["typescript", "linq", "collections"] }
]);
const allTags = articles.selectMany(article => article.tags);
console.log(allTags.toArray()); // ["typescript", "programming", "typescript", "linq", "collections"]
```

### `sequenceEqual`

Determines whether two sequences are equal by comparing their elements.

**Examples:**

```typescript
// Example 1: Compare two collections of numbers
const first = new Collection([1, 2, 3]);
const second = [1, 2, 3];
const isEqual = first.sequenceEqual(second);
console.log(isEqual); // true

// Example 2: Compare with custom comparer
const users1 = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const users2 = [{id: 1, name: "Alice (copy)"}, {id: 2, name: "Bob (copy)"}];
const areEqual = users1.sequenceEqual(users2, (a, b) => a.id === b.id);
console.log(areEqual); // true
```

### `single`

Returns the only element of a sequence that satisfies a condition.

**Examples:**

```typescript
// Example 1: Get the only element that satisfies a condition
const numbers = new Collection([1, 2, 3, 4, 5]);
try {
  const onlyThree = numbers.single(x => x === 3);
  console.log(onlyThree); // 3
} catch (e) {
  console.log("Error: multiple elements or no elements found");
}

// Example 2: Try to get an element where multiple satisfy the condition
try {
  const evenNumber = numbers.single(x => x % 2 === 0);
} catch (e) {
  console.log("Error: multiple elements found"); // Will be displayed, as there are two even numbers
}
```

### `singleOrDefault`

Returns the only element of a sequence that satisfies a condition or a default value if none exists.

**Examples:**

```typescript
// Example 1: Get the only element that satisfies a condition
const numbers = new Collection([1, 2, 3, 4, 5]);
const onlyThree = numbers.singleOrDefault(0, x => x === 3);
console.log(onlyThree); // 3

// Example 2: Get default value when no element satisfies the condition
const bigNumber = numbers.singleOrDefault(0, x => x > 10);
console.log(bigNumber); // 0

// Example 3: Throw exception when multiple elements satisfy the condition
try {
  const evenNumber = numbers.singleOrDefault(0, x => x % 2 === 0);
} catch (e) {
  console.log("Error: multiple elements found"); // Will be displayed
}
```

### `skip`

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

**Examples:**

```typescript
// Example 1: Skip the first two elements
const numbers = new Collection([1, 2, 3, 4, 5]);
const skipped = numbers.skip(2);
console.log(skipped.toArray()); // [3, 4, 5]

// Example 2: Skip more elements than exist in the collection
const tooManySkipped = numbers.skip(10);
console.log(tooManySkipped.toArray()); // [] (empty collection)
```

### `skipLast`

Bypasses a specified number of elements at the end of a sequence.

**Examples:**

```typescript
// Example 1: Skip the last two elements
const numbers = new Collection([1, 2, 3, 4, 5]);
const withoutLast = numbers.skipLast(2);
console.log(withoutLast.toArray()); // [1, 2, 3]

// Example 2: Skip more elements than exist in the collection
const letters = new Collection(["a", "b", "c"]);
const tooManySkipped = letters.skipLast(5);
console.log(tooManySkipped.toArray()); // [] (empty collection)
```

### `sum`

Computes the sum of values in a sequence.

**Examples:**

```typescript
// Example 1: Sum of numbers
const numbers = new Collection([1, 2, 3, 4, 5]);
const sum = numbers.sum();
console.log(sum); // 15

// Example 2: Sum of object properties
const products = new Collection([
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
]);
const totalPrice = products.sum(p => p.price);
console.log(totalPrice); // 1100
```

### `take`

Returns a specified number of contiguous elements from the start of a sequence.

**Examples:**

```typescript
// Example 1: Take the first three elements
const numbers = new Collection([1, 2, 3, 4, 5]);
const firstThree = numbers.take(3);
console.log(firstThree.toArray()); // [1, 2, 3]

// Example 2: Try to take more elements than exist
const moreNumbers = numbers.take(10);
console.log(moreNumbers.toArray()); // [1, 2, 3, 4, 5] (all available elements)
```

### `thenBy`

Performs a secondary ordering of elements.

**Examples:**

```typescript
// Example 1: Sort people by age and then by name
const people = new Collection([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 },
  { name: "David", age: 25 }
]);

const ordered = people
  .orderBy(p => p.age)
  .thenBy(p => p.name);

console.log(ordered.toArray());
// [
//   { name: "Bob", age: 25 },
//   { name: "David", age: 25 },
//   { name: "Alice", age: 30 },
//   { name: "Charlie", age: 30 }
// ]

// Example 2: Sort products by category and then by price
const products = new Collection([
  { name: "Mouse", category: "Peripherals", price: 25 },
  { name: "Keyboard", category: "Peripherals", price: 50 },
  { name: "Monitor", category: "Displays", price: 200 },
  { name: "TV", category: "Displays", price: 500 }
]);

const sortedProducts = products
  .orderBy(p => p.category)
  .thenBy(p => p.price);

console.log(sortedProducts.toArray());
// [
//   { name: "Monitor", category: "Displays", price: 200 },
//   { name: "TV", category: "Displays", price: 500 },
//   { name: "Mouse", category: "Peripherals", price: 25 },
//   { name: "Keyboard", category: "Peripherals", price: 50 }
// ]
```

### `thenByDescending`

Performs a secondary descending ordering of elements.

**Examples:**

```typescript
// Example 1: Sort people by age ascending and then by name descending
const people = new Collection([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 },
  { name: "David", age: 25 }
]);

const ordered = people
  .orderBy(p => p.age)
  .thenByDescending(p => p.name);

console.log(ordered.toArray());
// [
//   { name: "David", age: 25 },
//   { name: "Bob", age: 25 },
//   { name: "Charlie", age: 30 },
//   { name: "Alice", age: 30 }
// ]

// Example 2: Sort products by category and then by price descending
const products = new Collection([
  { name: "Mouse", category: "Peripherals", price: 25 },
  { name: "Keyboard", category: "Peripherals", price: 50 },
  { name: "Monitor", category: "Displays", price: 200 },
  { name: "TV", category: "Displays", price: 500 }
]);

const sortedProducts = products
  .orderBy(p => p.category)
  .thenByDescending(p => p.price);

console.log(sortedProducts.toArray());
// [
//   { name: "TV", category: "Displays", price: 500 },
//   { name: "Monitor", category: "Displays", price: 200 },
//   { name: "Keyboard", category: "Peripherals", price: 50 },
//   { name: "Mouse", category: "Peripherals", price: 25 }
// ]
```

### `union`

Produces the set union of two sequences.

**Examples:**

```typescript
// Example 1: Union of two collections of numbers
const first = new Collection([1, 2, 3]);
const second = [3, 4, 5];
const union = first.union(second);
console.log(union.toArray()); // [1, 2, 3, 4, 5]

// Example 2: Union of collections of objects with custom comparer
const users1 = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]);
const users2 = [
  { id: 2, name: "Bob (copy)" },
  { id: 3, name: "Carol" }
];

const allUsers = users1.union(users2, (a, b) => a.id === b.id);
console.log(allUsers.toArray());
// [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Carol" }
// ]
```

### `where`

Filters a sequence based on a predicate.

**Examples:**

```typescript
// Example 1: Filter even numbers
const numbers = new Collection([1, 2, 3, 4, 5, 6]);
const evens = numbers.where(x => x % 2 === 0);
console.log(evens.toArray()); // [2, 4, 6]

// Example 2: Filter people with age greater than 30
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const olderThan30 = people.where(p => p.age > 30);
console.log(olderThan30.toArray());
// [
//   { name: "Bob", age: 40 },
//   { name: "Carol", age: 35 }
// ]
```

### `zip`

Applies a function to corresponding elements of two sequences, producing a sequence of results.

**Examples:**

```typescript
// Example 1: Combine two collections of numbers
const first = new Collection([1, 2, 3]);
const second = [4, 5, 6];
const zipped = first.zip(second, (a, b) => a + b);
console.log(zipped.toArray()); // [5, 7, 9]

// Example 2: Combine first and last names
const firstNames = new Collection(["Alice", "Bob", "Carol"]);
const lastNames = ["Smith", "Johnson", "Williams"];
const fullNames = firstNames.zip(lastNames, (first, last) => `${first} ${last}`);
console.log(fullNames.toArray());
// ["Alice Smith", "Bob Johnson", "Carol Williams"]
```

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Romulo Ribeiro