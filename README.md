# LinqToo

Welcome to **LinqToo** — a powerful TypeScript library inspired by C# LINQ, designed to bring the magic of expressive, fluent querying to your arrays! 🚀

Easily manipulate, filter, group, and combine data with familiar methods — making your code cleaner, more readable, and more fun to write.

---

## Installation

```bash
npm install linqtoo
```

## 📚 Table of Contents

| Group name                | Methods | Group name                | Methods | Group name                | Methods |
|:---------------------------:|:----------------------------|:---------------------------:|:----------------------------|:---------------------------:|:----------------------------|
| **🔢 Aggregation & Quantifiers** | 🔸 [AggregateLinq](#aggregatelinq)<br/>🔸 [AllLinq](#alllinq)<br/>🔸 [AnyLinq](#anylinq)<br/>🔸 [AverageLinq](#averagelinq)<br/>🔸 [ContainsLinq](#containslinq)<br/>🔸 [CountLinq](#countlinq)<br/>🔸 [MaxLinq](#maxlinq)<br/>🔸 [MinLinq](#minlinq)<br/>🔸 [SumLinq](#sumlinq) | **🔗 Combination** | 🔸 [ConcatLinq](#concatlinq)<br/>🔸 [ZipLinq](#ziplinq) | **🎯 Element Retrieval** | 🔸 [ElementAtLinq](#elementatlinq)<br/>🔸 [ElementAtOrDefaultLinq](#elementatordefaultlinq)<br/>🔸 [FirstLinq](#firstlinq)<br/>🔸 [FirstOrDefaultLinq](#firstordefaultlinq)<br/>🔸 [LastLinq](#lastlinq)<br/>🔸 [LastOrDefaultLinq](#lastordefaultlinq)<br/>🔸 [SingleLinq](#singlelinq)<br/>🔸 [SingleOrDefaultLinq](#singleordefaultlinq) |
| **🔎 Filtering** | 🔸 [DistinctByLinq](#distinctbylinq)<br/>🔸 [DistinctLinq](#distinctlinq)<br/>🔸 [WhereLinq](#wherelinq) | **🧩 Grouping** | 🔸 [GroupByLinq](#groupbylinq) | **🔗 Joins** | 🔸 [JoinLinq](#joinlinq) |
| **🛠️ Other Utilities** | 🔸 [AppendLinq](#appendlinq)<br/>🔸 [DefaultIfEmptyLinq](#defaultifemptylinq)<br/>🔸 [EmptyLinq](#emptylinq)<br/>🔸 [PrependLinq](#prependlinq)<br/>🔸 [RangeLinq](#rangelinq)<br/>🔸 [RepeatLinq](#repeatlinq)<br/>🔸 [ReverseLinq](#reverselinq)<br/>🔸 [SequenceEqualLinq](#sequenceequallinq) | **✂️ Partitioning** | 🔸 [ChunkLinq](#chunklinq)<br/>🔸 [SkipLinq](#skiplinq)<br/>🔸 [SkipWhileLinq](#skipwhilelinq)<br/>🔸 [TakeLinq](#takelinq)<br/>🔸 [TakeWhileLinq](#takewhilelinq) | **🎨 Projection** | 🔸 [SelectLinq](#selectlinq)<br/>🔸 [SelectManyLinq](#selectmanylinq) |
| **🔄 Set Operations** | 🔸 [ExceptLinq](#exceptlinq)<br/>🔸 [IntersectLinq](#intersectlinq)<br/>🔸 [UnionLinq](#unionlinq) | **↕️ Sorting** | 🔸 [OrderByLinq](#orderbylinq)<br/>🔸 [OrderByDescendingLinq](#orderbydescendinglinq)<br/>🔸 [ThenByLinq](#thenbylinq)<br/>🔸 [ThenByDescendingLinq](#thenbydescendinglinq) |  |  |
### 🔢 Aggregation & Quantifiers

### AggregateLinq

**aggregateLinq** combines all elements of an array into a single result using a seed value and an accumulator function

#### Exemples:

```
const numbers = [1, 2, 3, 4];
const sum = numbers.aggregateLinq(0, (acc, val) => acc + val);
console.log(sum); // Output: 10

const words = ['Hello', ' ', 'world', '!'];
const sentence = words.aggregateLinq('', (acc, word) => acc + word);
console.log(sentence); // Output: "Hello world!"

const empty: number[] = [];
const startValue = 5;
const result = empty.aggregateLinq(startValue, (acc, val) => acc + val);
console.log(result); // Output: 5
```
<hr style="border: 1; height: 2px; background: #eee;" />

### AllLinq

**allLinq** method tests whether all elements in an array satisfy a given condition (predicate). If no predicate is provided, it returns true only if all elements are truthy. Returns false otherwise. Empty arrays always return true.

#### Exemples:

```
const numbers = [2, 4, 6, 8];
const mixed = [2, 3, 6];
const empty: number[] = [];

console.log(numbers.allLinq(x => x % 2 === 0)); // true, all are even
console.log(mixed.allLinq(x => x % 2 === 0));   // false, 3 is not even
console.log(empty.allLinq(x => x > 0));         // true, empty array returns true by default
console.log([1, 'hello', true].allLinq());      // true, all truthy
console.log([1, 0, true].allLinq());             // false, 0 is falsy
```
<hr style="border: 1; height: 2px; background: #eee;" />


### AnyLinq

**anyLinq** determines if the array contains any elements that satisfy an optional predicate.  
If no predicate is provided, it checks if the array has any elements at all.

#### Exemples:

```
const numbers = [0, 1, 2, 3];
console.log(numbers.anyLinq()); // true (array not empty)

console.log(numbers.anyLinq(x => x > 2)); // true (3 > 2)

console.log(numbers.anyLinq(x => x > 5)); // false

const people = [
  { name: 'Romulo', active: true },
  { name: 'Bia', active: false }
];

console.log(people.anyLinq(p => p.active)); // true
console.log(people.anyLinq(p => p.name === 'Charlie')); // false
console.log(people.anyLinq(p => p.name === 'Bia')); // true
```
<hr style="border: 1; height: 2px; background: #eee;" />

### AverageLinq

**averageLinq** calculates the arithmetic mean of a sequence of numeric values. Returns the average value as a decimal number. Can be used with or without a selector function to specify which property to average. Throws an exception if the sequence is empty or contains non-numeric values.

#### Exemples:

```
const numbers = [10, 20, 30];
console.log('Average:', numbers.averageLinq()); // Output: 20

// With selector
const people = [
  { name: 'Romulo', age: 25 },
  { name: 'Bia', age: 35 },
  { name: 'Felipe', age: 40 }
];

console.log('Average age:', people.averageLinq(p => p.age)); // Output: 33.33...

// Empty array
console.log('Empty average:', [].averageLinq()); // Output: NaN
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ContainsLinq

**containsLinq** method checks whether an array includes a specific item using strict equality (===). For objects, it checks by reference, not value.

#### Exemples:

```
console.log([1, 2, 3].containsLinq(2)); // true
console.log([1, 2, 3].containsLinq(4)); // false
console.log(['apple', 'banana'].containsLinq('apple')); // true
console.log(['apple', 'banana'].containsLinq('grape')); // false

const user = { id: 1 };
const users = [user];
console.log(users.containsLinq(user)); // true
console.log(users.containsLinq({ id: 1 })); // false (different reference)

```
<hr style="border: 1; height: 2px; background: #eee;" />

### CountLinq

**countLinq** method returns the number of elements that satisfy an optional predicate function.

#### Exemples:

```
// Count all items in the array
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.countLinq()); // Output: 5

// Count items matching a condition
const mixed = [1, 2, 3, 4, 5, 6];
const evenCount = mixed.countLinq(x => x % 2 === 0);
console.log(evenCount); // Output: 3

// Count truthy values in an array with falsy items
const values = [0, null, undefined, '', false, 'hello', 42];
const truthyCount = values.countLinq(x => Boolean(x));
console.log(truthyCount); // Output: 2 ('hello' and 42)
```
<hr style="border: 1; height: 2px; background: #eee;" />

### MaxLinq

**maxLinq** method returns the largest numeric value in the array. Optionally accepts a selector function to extract numeric values from complex items.

#### Exemples:

```
const numbers = [3, 7, 2, 8];
console.log(numbers.maxLinq()); // Output: 8

const people = [
  { name: 'Romulo', age: 28 },
  { name: 'Bia', age: 22 },
  { name: 'Felipe', age: 30 }
];

console.log(people.maxLinq(p => p.age)); // Output: 30
```
<hr style="border: 1; height: 2px; background: #eee;" />

### MinLinq

**minLinq** returns the smallest numeric value in the array. Optionally accepts a selector function to extract numeric values from complex items.

#### Exemples:

```
const numbers = [3, 7, 2, 8];
console.log(numbers.minLinq()); // Output: 2

const people = [
  { name: 'Romulo', age: 28 },
  { name: 'Bia', age: 22 },
  { name: 'Felipe', age: 30 }
];

console.log(people.minLinq(p => p.age)); // Output: 22
```
<hr style="border: 1; height: 2px; background: #eee;" />

### SumLinq

**sumLinq** method returns the total sum of all elements, 
optionally applying a selector function before summing.

#### Exemples:

```
const arr = [10, 20, 30, 40];

console.log('Total:', arr.sumLinq()); // Output: 100

console.log('Total doubled:', arr.sumLinq(x => x * 2)); // Output: 200

const mixed = [1.2, 3.5, 4.3];
console.log('Float sum:', mixed.sumLinq()); // Output: 9.0
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🔗 Combination
### ConcatLinq

**concatLinq** method merges two arrays into a single array without modifying the originals.

#### Exemples:

```
// Test 1: concatenating numeric arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const result1 = a.concatLinq(b);
console.log('Test 1:', result1); 
// Expected: [1, 2, 3, 4, 5, 6]

// Test 2: string arrays
const nomes1 = ['Romulo', 'Bia'];
const nomes2 = ['Felipe'];
const result2 = nomes1.concatLinq(nomes2);
console.log('Test 2:', result2); 
// Expected: ['Romulo', 'Bia', 'Felipe']

// Test 3: empty arrays
const vazio: number[] = [];
const result3 = a.concatLinq(vazio);
console.log('Test 3:', result3); 
// Expected: [1, 2, 3]

// Test 4: one of the arrays is undefined (should throw an error)
try {
  const result4 = a.concatLinq(undefined as any);
  console.log('Test 4:', result4);
} catch (err) {
  console.log('Test 4: error correctly caught ->', (err as Error).message);
}
// Expected: error with message "Parameter must be an array"

// Test 5: object arrays
const obj1 = [{ id: 1 }, { id: 2 }];
const obj2 = [{ id: 3 }];
const result5 = obj1.concatLinq(obj2);
console.log('Test 5:', result5);
// Expected: [{ id: 1 }, { id: 2 }, { id: 3 }]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ZipLinq

**zipLinq** method creates a new array by combining elements from two arrays using a selector function.

#### Exemples:

```
const numbers = [1, 2, 3];
const letters = ['A', 'B', 'C', 'D'];

const zipped = numbers.zipLinq(letters, (n, l) => `${n}${l}`);
console.log(zipped); // ["1A", "2B", "3C"]

const users = ['Romulo', 'Bia'];
const ages = [30, 25];

const userInfo = users.zipLinq(ages, (name, age) => ({ name, age }));
console.log(userInfo);
// [ { name: 'Romulo', age: 30 }, { name: 'Bia', age: 25 } ]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🎯 Element Retrieval

### ElementAtLinq

**elementAtLinq** returns the element at the specified zero-based index in the array. If the index is out of range (negative or beyond the last element), it returns undefined. 

#### Exemples:

```
const arr = ['apple', 'banana', 'cherry'];

console.log(arr.elementAtLinq(0)); // Output: apple
console.log(arr.elementAtLinq(2)); // Output: cherry
console.log(arr.elementAtLinq(5)); // Output: undefined (index out of range)
console.log(arr.elementAtLinq(-1)); // Output: undefined (negative index)

const emptyArr: number[] = [];
console.log(emptyArr.elementAtLinq(0)); // Output: undefined
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ElementAtOrDefaultLinq

**elementAtOrDefaultLinq** method returns the element at the specified zero-based index in the array. If the index is out of range (negative or beyond the last element), it returns the provided default value if specified, or undefined otherwise. 

#### Exemples:

```
const arr = ['apple', 'banana', 'cherry'];

console.log(arr.elementAtOrDefaultLinq(0)); // Output: apple
console.log(arr.elementAtOrDefaultLinq(2)); // Output: cherry
console.log(arr.elementAtOrDefaultLinq(5)); // Output: undefined (index out of range)
console.log(arr.elementAtOrDefaultLinq(5, 'default fruit')); // Output: default fruit

const emptyArr: number[] = [];
console.log(emptyArr.elementAtOrDefaultLinq(0)); // Output: undefined
console.log(emptyArr.elementAtOrDefaultLinq(0, 42)); // Output: 42
```
<hr style="border: 1; height: 2px; background: #eee;" />

### FirstLinq

**firstLinq** method returns the first element of the array, or the first that matches the predicate if one is provided. If no elements exist or no match is found, it returns undefined.  

#### Exemples:

```
const numbers = [10, 20, 30];
console.log(numbers.firstLinq()); // Output: 10

console.log(numbers.firstLinq(x => x > 15)); // Output: 20

const empty: number[] = [];
console.log(empty.firstLinq()); // Output: undefined

const names = ['Romulo', 'Bia', 'Felipe'];
console.log(names.firstLinq()); // Output: "Romulo"
console.log(names.firstLinq(name => name.startsWith('B'))); // Output: "Bia"

```
<hr style="border: 1; height: 2px; background: #eee;" />

### FirstOrDefaultLinq

**firstOrDefaultLinq** method returns the first element of the array that matches the given predicate, or the first element if no predicate is provided. If the array is empty or no match is found, it returns the provided defaultValue, or undefined if none is given. 

#### Exemples:

```
const numbers = [5, 10, 15];
console.log(numbers.firstOrDefaultLinq()); // Output: 5

console.log(numbers.firstOrDefaultLinq(x => x > 10)); // Output: 15

console.log(numbers.firstOrDefaultLinq(x => x > 20, 99)); // Output: 99

const empty: number[] = [];
console.log(empty.firstOrDefaultLinq(undefined, -1)); // Output: -1

const names = ['Alice', 'Bob'];
console.log(names.firstOrDefaultLinq(name => name.startsWith('C'), 'Unknown')); // Output: "Unknown"


```
<hr style="border: 1; height: 2px; background: #eee;" />

### LastLinq

**lastLinq** method returns the last element of the array, or the last element that matches the given predicate. If the array is empty or no match is found, it returns undefined.  

#### Exemples:

```
const numbers = [10, 20, 30];
console.log(numbers.lastLinq()); // Output: 30

console.log(numbers.lastLinq(x => x < 25)); // Output: 20

const empty: number[] = [];
console.log(empty.lastLinq()); // Output: undefined

const names = ['Romulo', 'Bia', 'Felipe'];
console.log(names.lastLinq()); // Output: "Felipe"
console.log(names.lastLinq(name => name.startsWith('B'))); // Output: "Bia"
```
<hr style="border: 1; height: 2px; background: #eee;" />

### LastOrDefaultLinq

**lastOrDefaultLinq** method returns the last element of the array that matches the given predicate or the last element if no predicate is provided. If no element matches or the array is empty, it returns the supplied default value or undefined if no default is given.  

#### Exemples:

```
const numbers = [10, 20, 30];
console.log(numbers.lastOrDefaultLinq()); // Output: 30

console.log(numbers.lastOrDefaultLinq(x => x < 25)); // Output: 20

const empty: number[] = [];
console.log(empty.lastOrDefaultLinq(undefined, 99)); // Output: 99

console.log(empty.lastOrDefaultLinq()); // Output: undefined

const names = ['Romulo', 'Bia', 'Felipe'];
console.log(names.lastOrDefaultLinq(name => name.startsWith('B'), 'DefaultName')); // Output: "Bia"
console.log(names.lastOrDefaultLinq(name => name.startsWith('Z'), 'DefaultName')); // Output: "DefaultName"
```
<hr style="border: 1; height: 2px; background: #eee;" />

### SingleLinq

**singleLinq** method returns the only element in the array that matches the given predicate or, if no predicate is provided, returns the single element in the array. Throws an error if no elements or more than one element match.  

#### Exemples:

```
const numbers = [10];
console.log(numbers.singleLinq()); // Output: 10

const arr = [1, 2, 3, 4];
console.log(arr.singleLinq(x => x === 3)); // Output: 3

try {
  console.log(arr.singleLinq(x => x > 2)); // Throws Error: More than one element satisfies the condition
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
}
try {
  console.log([].singleLinq()); // Throws Error: Sequence contains no elements
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
}

```
<hr style="border: 1; height: 2px; background: #eee;" />

### SingleOrDefaultLinq

**singleOrDefaultLinq** method returns the single element in the array that satisfies the optional predicate. If no elements satisfy the predicate, it returns the provided default value or undefined if no default is specified. If more than one element satisfies the predicate (or exists in the array when no predicate is provided), it throws an error. This method is useful when you expect zero or one element to match a condition and want to safely handle the case when none match.  

#### Exemples:

```
const arr = [10, 20, 30, 20];

try {
  // Throws error because more than one element equals 20
  console.log(arr.singleOrDefault(x => x === 20)); 
} catch (e: any) {
  console.error(e.message); // More than one element satisfies the condition
}

// Returns 10 because only one element equals 10
console.log(arr.singleOrDefault(x => x === 10)); // 10

// Returns default 99 because no element equals 40
console.log(arr.singleOrDefault(x => x === 40, 99)); // 99

// Returns undefined because no element equals 40 and no default specified
console.log(arr.singleOrDefault(x => x === 40)); // undefined

// Without predicate, throws error because more than one element exists
try {
  console.log(arr.singleOrDefault());
} catch (e: any) {
  console.error(e.message); // More than one element satisfies the condition
}

// Without predicate, returns single element if array has one item
const singleElementArr = [123];
console.log(singleElementArr.singleOrDefault()); // 123

// Empty array returns default or undefined
const emptyArr: number[] = [];
console.log(emptyArr.singleOrDefault(undefined, 555)); // 555
console.log(emptyArr.singleOrDefault()); // undefined
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🔎 Filtering
### DistinctByLinq

**distinctByLinq** method returns a new array containing only the first occurrence of each unique element, based on the value returned by the selector function.  

#### Exemples:

```
const users = [
  { id: 1, name: 'Romulo', age: 30 },
  { id: 2, name: 'Bia', age: 25 },
  { id: 1, name: 'Felipe', age: 28 },
  { id: 3, name: 'Romulo', age: 30 },
  { id: 4, name: 'Felipe', age: 35 },
];

// Distinct by id
const byId = users.distinctByLinq(user => user.id);
console.log('Distinct by id:', byId);
// Output:
// [
//   { id: 1, name: 'Romulo', age: 30 },
//   { id: 2, name: 'Bia', age: 25 },
//   { id: 3, name: 'Romulo', age: 30 },
//   { id: 4, name: 'Felipe', age: 35 }
// ]

// Distinct by name
const byName = users.distinctByLinq(user => user.name);
console.log('Distinct by name:', byName);
// Output:
// [
//   { id: 1, name: 'Romulo', age: 30 },
//   { id: 2, name: 'Bia', age: 25 },
//   { id: 1, name: 'Felipe', age: 28 }
// ]

// Distinct by age
const byAge = users.distinctByLinq(user => user.age);
console.log('Distinct by age:', byAge);
// Output:
// [
//   { id: 1, name: 'Romulo', age: 30 },
//   { id: 2, name: 'Bia', age: 25 },
//   { id: 1, name: 'Felipe', age: 28 },
//   { id: 4, name: 'Felipe', age: 35 }
// ]

// Distinct by name + age (composite key)
const byNameAndAge = users.distinctByLinq(user => `${user.name}_${user.age}`);
console.log('Distinct by name + age:', byNameAndAge);
// Output:
// [
//   { id: 1, name: 'Romulo', age: 30 },
//   { id: 2, name: 'Bia', age: 25 },
//   { id: 1, name: 'Felipe', age: 28 },
//   { id: 4, name: 'Felipe', age: 35 }
// ]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### DistinctLinq

**distinctLinq** method returns a new array with all duplicate elements removed. If a selector function is provided, uniqueness is determined by the value returned from the selector.  

#### Exemples:

```
const numbers = [1, 2, 2, 3, 1];
console.log(numbers.distinctLinq()); // [1, 2, 3]

const names = ['Romulo', 'Bia', 'Romulo', 'Felipe'];
console.log(names.distinctLinq()); // ['Romulo', 'Bia', 'Felipe']

const users = [
  { id: 1, name: 'Romulo' },
  { id: 2, name: 'Bia' },
  { id: 1, name: 'Felipe' }
];

console.log(users.distinctLinq(user => user.id)); // [{ id: 1, name: 'Romulo' }, { id: 2, name: 'Bia' }]

```
<hr style="border: 1; height: 2px; background: #eee;" />

### WhereLinq

**whereLinq** method filters the elements of an array based on a provided predicate function and returns a new array containing all elements that satisfy the predicate. 

#### Exemples:

```
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.whereLinq(x => x % 2 === 0);
console.log(evens); // Output: [2, 4]

const users = [
  { id: 1, name: 'Romulo', age: 25 },
  { id: 2, name: 'Bia', age:30 },
  { id: 3, name: 'Felipe', age:40 }
];
const romulos = users.whereLinq(u => u.name === 'Romulo');
console.log(romulos); // Output: [{ id: 1, name: 'Romulo', age: 25  }]

const equal30 = users.whereLinq(u => u.age == 30);
console.log(equal30); // Output: [{ id: 2, name: 'Bia', age:30 }]

const greater30 = users.whereLinq(u => u.age > 30);
console.log(greater30); // Output: [{ id: 3, name: 'Felipe', age:40  }]

const lessThen30AndGreater30 = users.whereLinq(u => u.age < 30 || u.age > 30);
console.log(lessThen30AndGreater30); // Output: [{ id: 1, name: 'Romulo', age: 25  }, { id: 3, name: 'Felipe', age:40  }]

const startsWith = users.whereLinq(u => (u.age < 30 || u.age > 30) && u.name.startsWith('R'));
console.log(startsWith); // Output: [{ id: 1, name: 'Romulo', age: 25  }]

const emptyArr: number[] = [];
console.log(emptyArr.whereLinq(x => true)); // Output: []
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🧩 Grouping
### GroupByLinq

**groupByLinq** method groups the elements of an array based on a key returned by a selector function. It returns an object where each key maps to an array of elements sharing that key.  

#### Exemples:

```
const numbers = [1, 2, 3, 4, 5, 6];

const users = [
  { name: 'Romulo', age: 30 },
  { name: 'Bia', age: 25 },
  { name: 'Felipe', age: 30 },
  { name: 'Joana', age: 25 },
  { name: 'Lucas', age: 40 },
  { name: 'Mia', age: 30 }
];

const products = [
  { id: 1, name: 'Apple', category: 'Fruit' },
  { id: 2, name: 'Broccoli', category: 'Vegetable' },
  { id: 3, name: 'Banana', category: 'Fruit' },
  { id: 4, name: 'Carrot', category: 'Vegetable' }
];

// Example 1: Group numbers by even or odd
console.log('Group numbers by even/odd:');
console.log(numbers.groupByLinq(n => n % 2 === 0 ? 'even' : 'odd'));

// Example 2: Group users by age
console.log('\nGroup users by age:');
console.log(users.groupByLinq(user => user.age));

// Example 3: Group users by the first letter of their name
console.log('\nGroup users by first letter:');
console.log(users.groupByLinq(user => user.name[0]));

// Example 4: Group products by category
console.log('\nGroup products by category:');
console.log(products.groupByLinq(product => product.category));

// Example 5: Group users by "young" or "adult"
console.log('\nGroup users by age group:');
console.log(users.groupByLinq(user => user.age < 30 ? 'young' : 'adult'));

// Example 6: Group numbers by modulo 3
console.log('\nGroup numbers by modulo 3:');
console.log(numbers.groupByLinq(n => `mod${n % 3}`));
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🔗 Joins
### JoinLinq

**joinLinq** method joins two arrays by matching keys from each element.
It returns a new array with elements projected from the matching pairs.  

#### Exemples:

```
interface User {
  id: number;
  name: string;
}

interface Order {
  userId: number;
  product: string;
}

const users: User[] = [
  { id: 1, name: 'Romulo' },
  { id: 2, name: 'Bia' },
  { id: 3, name: 'Felipe' },
];

const orders: Order[] = [
  { userId: 1, product: 'Book' },
  { userId: 2, product: 'Pen' },
  { userId: 1, product: 'Notebook' },
];

const joined = users.joinLinq(
  orders,
  user => user.id,
  order => order.userId,
  (user, order) => ({ userName: user.name, product: order.product })
);

console.log(joined);
// [
//   { userName: 'Romulo', product: 'Book' },
//   { userName: 'Romulo', product: 'Notebook' },
//   { userName: 'Bia', product: 'Pen' }
// ]

interface Student {
  id: number;
  name: string;
}

interface Grade {
  studentId: number;
  value: number;
}

const students: Student[] = [
  { id: 1, name: 'Romulo' },
  { id: 2, name: 'Bia' }
];

const grades: Grade[] = [
  { studentId: 1, value: 9.5 },
  { studentId: 1, value: 8.3 },
  { studentId: 2, value: 7.0 }
];

const studentGrades = students.joinLinq(
  grades,
  student => student.id,
  grade => grade.studentId,
  (student, grade) => ({
    name: student.name,
    grade: grade.value
  })
);

console.log(studentGrades);
// [
//   { name: 'Romulo', grade: 9.5 },
//   { name: 'Romulo', grade: 8.3 },
//   { name: 'Bia', grade: 7.0 }
// ]


interface Product {
  id: number;
  name: string;
  categoryId: number;
}

interface Category {
  id: number;
  label: string;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', categoryId: 10 },
  { id: 2, name: 'Mouse', categoryId: 20 },
  { id: 3, name: 'Keyboard', categoryId: 10 }
];

const categories: Category[] = [
  { id: 10, label: 'Electronics' },
  { id: 20, label: 'Accessories' }
];

const productsWithCategories = products.joinLinq(
  categories,
  product => product.categoryId,
  category => category.id,
  (product, category) => ({
    product: product.name,
    category: category.label
  })
);

console.log(productsWithCategories);
// [
//   { product: 'Laptop', category: 'Electronics' },
//   { product: 'Keyboard', category: 'Electronics' },
//   { product: 'Mouse', category: 'Accessories' }
// ]


interface Client {
  id: number;
  name: string;
}

interface Address {
  clientId: number;
  city: string;
}

const clients: Client[] = [
  { id: 1, name: 'Romulo' },
  { id: 2, name: 'Bia' }
];

const addresses: Address[] = [
  { clientId: 1, city: 'São Paulo' },
  { clientId: 1, city: 'Campinas' },
  { clientId: 2, city: 'Rio de Janeiro' }
];

const clientsWithAddresses = clients.joinLinq(
  addresses,
  client => client.id,
  address => address.clientId,
  (client, address) => ({
    clientName: client.name,
    city: address.city
  })
);

console.log(clientsWithAddresses);
// [
//   { clientName: 'Romulo', city: 'São Paulo' },
//   { clientName: 'Romulo', city: 'Campinas' },
//   { clientName: 'Bia', city: 'Rio de Janeiro' }
// ]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🛠️ Other Utilities
### AppendLinq

**appendLinq** method returns a new array with the specified item added at the end of the sequence. It does not modify the original array.  

#### Exemples:

```
const numbers = [1, 2, 3];
const appended = numbers.append(4);
console.log(appended); // [1, 2, 3, 4]

const empty = [].append('hello');
console.log(empty); // ['hello']

const users = [{ name: 'Romulo' }];
const newUser = { name: 'Bia' };
console.log(users.append(newUser)); // [{ name: 'Romulo' }, { name: 'Bia' }]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### DefaultIfEmptyLinq

**defaultIfEmptyLinq** method returns the original array if it has elements; otherwise, it returns a new array with the provided default value. Useful for ensuring a fallback value when dealing with empty sequences.  

#### Exemples:

```
const emptyNumbers: number[] = [];
const result1 = emptyNumbers.defaultIfEmptyLinq(0);
console.log(result1); // [0]

const names = ['Romulo'];
const result2 = names.defaultIfEmptyLinq('DefaultName');
console.log(result2); // ['Romulo']

const emptyNames: string[] = [];
const result3 = emptyNames.defaultIfEmptyLinq('NoName');
console.log(result3); // ['NoName']
```
<hr style="border: 1; height: 2px; background: #eee;" />

### EmptyLinq

**emptyLinq** method that returns a new empty array of the specified generic type. It provides a convenient way to create empty arrays without manually typing [], helping improve code readability and consistency.  

#### Exemples:

```
const emptyNumbers = Array.empty<number>();
console.log(emptyNumbers); // []

const emptyStrings = Array.empty<string>();
console.log(emptyStrings); // []

const emptyObjects = Array.empty<{ name: string }>();
console.log(emptyObjects); // []  
```
<hr style="border: 1; height: 2px; background: #eee;" />

### PrependLinq

**prependLinq** method adds a single element to the beginning of an array and returns a new array without modifying the original.  

#### Exemples:

```
const nums = [2, 3];
const updatedNums = nums.prepend(1);
console.log(updatedNums); // [1, 2, 3]

const words = ['world'];
const greeting = words.prepend('hello');
console.log(greeting); // ['hello', 'world']

const emptyArray = ([] as number[]).prepend(42);
console.log(emptyArray); // [42]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### RangeLinq

**rangeLinq**  method generates a sequence of integers, starting from start and producing count consecutive numbers.

#### Exemples:

```
const numbers = Array.rangeLinq(1, 5);
console.log(numbers); // [1, 2, 3, 4, 5]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### RepeatLinq

**repeatLinq** method creates a new array that contains a specified value repeated a given number of times.   

#### Exemples:

```
const repeated = Array.repeatLinq('Romulo', 3);
console.log(repeated); // ['Romulo', 'Romulo', 'Romulo']

const repeatedNumber = Array.repeatLinq(5, 2);
console.log(repeatedNumber); // [5, 5]

const obj = { name: 'Romulo' };
const repeatedObj = Array.repeatLinq(obj, 3);
console.log(repeatedObj);
// [{ name: 'Romulo' }, { name: 'Romulo' }, { name: 'Romulo' }]
console.log(repeatedObj[0] === repeatedObj[1]); // true (mesma referência)
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ReverseLinq

**reverseLinq** method returns a new array with the elements of the current array in reverse order. This method does **not** mutate the original array.  

#### Exemples:

```
// Test 1: Reverse numbers
const numbers = [1, 2, 3, 4];
const reversedNumbers = numbers.reverseLinq();
console.log('Test 1:', reversedNumbers); 
// Expected: [4, 3, 2, 1]

// Test 2: Reverse strings
const names = ['Romulo', 'Bia', 'Felipe'];
const reversedNames = names.reverseLinq();
console.log('Test 2:', reversedNames); 
// Expected: ['Felipe', 'Bia', 'Romulo']

// Test 3: Reverse empty array
const empty: number[] = [];
const reversedEmpty = empty.reverseLinq();
console.log('Test 3:', reversedEmpty); 
// Expected: []

// Test 4: Ensure original array is not mutated
const original = [1, 2, 3];
const reversed = original.reverseLinq();
console.log('Test 4:', original); 
// Expected: [1, 2, 3]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### SequenceEqualLinq

**sequenceEqualLinq** method compares two arrays for equality by checking that they have the same elements in the same order.
An optional comparer function can be provided for custom comparison logic (e.g., comparing objects by properties).
Defaults to strict equality (===) when no comparer is supplied.  

#### Exemples:

```
// Test 1: Primitive values, same content and order
const r1 = [1, 2, 3].sequenceEqualLinq([1, 2, 3]);
console.log('Test 1:', r1); // Expected: true

// Test 2: Different lengths
const r2 = [1, 2, 3].sequenceEqualLinq([1, 2]);
console.log('Test 2:', r2); // Expected: false

// Test 3: Same values, different order
const r3 = [1, 2, 3].sequenceEqualLinq([3, 2, 1]);
console.log('Test 3:', r3); // Expected: false

// Test 4: Objects without comparer
const obj1 = [{ id: 1 }];
const obj2 = [{ id: 1 }];
const r4 = obj1.sequenceEqualLinq(obj2);
console.log('Test 4:', r4); // Expected: false (different references)

// Test 5: Objects with comparer
const r5 = obj1.sequenceEqualLinq(obj2, (a, b) => a.id === b.id);
console.log('Test 5:', r5); // Expected: true
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ✂️ Partitioning
### ChunkLinq

**chunkLinq** method splits a sequence into chunks (batches) of a specified size.  
  Returns an array of arrays, each inner array is a chunk of the original sequence.  

#### Exemples:

```
const arr = [1, 2, 3, 4, 5, 6, 7];

console.log('Test 1: chunkLinq(3)');
console.log(arr.chunkLinq(3)); // Expected: [[1,2,3],[4,5,6],[7]]

console.log('Test 2: empty array');
console.log([].chunkLinq(3)); // Expected: []

console.log('Test 3: chunk size larger than array');
console.log([1, 2].chunkLinq(5)); // Expected: [[1,2]]

console.log('Test 4: invalid size (0) - should throw error');
try {
   arr.chunkLinq(0);
} catch (e) {
   console.log('Caught error as expected:', (e as Error).message);
}

console.log('Test 5: invalid size (-2) - should throw error');
try {
   arr.chunkLinq(-2);
} catch (e) {
   console.log('Caught error as expected:', (e as Error).message);
}
```
<hr style="border: 1; height: 2px; background: #eee;" />

### SkipLinq

**skipLinq** method skips the first N elements and returns the remaining ones.  

#### Exemples:

```
const names = ['Romulo', 'Bia', 'Felipe', 'Lucas', 'Ana'];

console.log(names.skipLinq(2)); // ['Felipe', 'Lucas', 'Ana']
console.log(names.skipLinq(0)); // ['Romulo', 'Bia', 'Felipe', 'Lucas', 'Ana']
console.log(names.skipLinq(10)); // []
console.log([].skipLinq(2));     // []
```
<hr style="border: 1; height: 2px; background: #eee;" />

### SkipWhileLinq

**skipWhileLinq** method skips elements at the beginning of the array while the condition is true, then includes all remaining elements starting from the first one that fails the condition.  

#### Exemples:

```
const numbers = [1, 2, 3, 10, 5, 6];

const result = numbers.skipWhileLinq(n => n < 10);
console.log(result); // [10, 5, 6]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### TakeLinq

**takeLinq** method returns the first N elements of the array.  

#### Exemples:

```
const names = ['Romulo', 'Bia', 'Felipe', 'Lucas', 'Ana'];

console.log(names.takeLinq(2)); // ['Romulo', 'Bia']
console.log(names.takeLinq(0)); // []
console.log(names.takeLinq(10)); // ['Romulo', 'Bia', 'Felipe', 'Lucas', 'Ana']
console.log([].takeLinq(3));     // []
```
<hr style="border: 1; height: 2px; background: #eee;" />

### TakeWhileLinq

**takeWhileLinq** method returns elements from the array as long as the predicate returns true. Stops at the first false.  

#### Exemples:

```
const ages = [21, 25, 28, 18, 30, 35];

const under30 = ages.takeWhileLinq(age => age < 30);
console.log(under30); // [21, 25, 28]

const names = ['Romulo', 'Bia', 'Felipe', 'Ana'];

const untilFelipe = names.takeWhileLinq(name => name !== 'Felipe');
console.log(untilFelipe); // ['Romulo', 'Bia']
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🎨 Projection
### SelectLinq

**selectLinq** method projects each element of a sequence into a new form by applying a selector function.  

#### Exemples:

```
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Romulo' },
  { id: 2, name: 'Bia' },
  { id: 3, name: 'Felipe' },
];

const names = users.selectLinq(user => user.name);

console.log(names); // Output: ['Romulo', 'Bia', 'Felipe']
```
<hr style="border: 1; height: 2px; background: #eee;" />

### SelectManyLinq

**selectManyLinq** method projects each element of a sequence to an array and flattens the resulting arrays into one sequence.  

#### Exemples:

```
const data = [
  { id: 1, tags: ['red', 'blue'] },
  { id: 2, tags: ['green'] },
  { id: 3, tags: [] },
];

const tags = data.selectManyLinq(item => item.tags);
console.log(tags); // ['red', 'blue', 'green']
```
<hr style="border: 1; height: 2px; background: #eee;" />

### 🔄 Set Operations
### ExceptLinq

**exceptLinq** method returns the elements of the first array that are not present in the second array  

#### Exemples:

```
// Test 1: Numbers
const numbers1 = [1, 2, 3, 4];
const numbers2 = [2, 4];
const result1 = numbers1.exceptLinq(numbers2);
console.log('Test 1:', result1);
// Expected: [1, 3]

const nomes1 = ['Romulo', 'Bia', 'Felipe'];
const nomes2 = ['Bia'];
const result2 = nomes1.exceptLinq(nomes2);
console.log('Test 2:', result2);
// Expected: ['Romulo', 'Felipe']

const result3 = nomes1.exceptLinq(['Zé']);
console.log('Test 3:', result3);
// Expected: ['Romulo', 'Bia', 'Felipe']

const result4 = nomes1.exceptLinq(['Romulo', 'Bia', 'Felipe']);
console.log('Test 4:', result4);
// Expected: []

const result5 = nomes1.exceptLinq([]);
console.log('Test 5:', result5);
// Expected: ['Romulo', 'Bia', 'Felipe']

try {
  const result6 = nomes1.exceptLinq(undefined as any);
  console.log('Test 6:', result6);
} catch (err) {
  console.log('Test 6: erro capturado corretamente ->', (err as Error).message);
}
// Expected: Error "Parameter must be an array"
```
<hr style="border: 1; height: 2px; background: #eee;" />

### IntersectLinq

**intersectLinq** method returns the common elements shared by two arrays, eliminating duplicates.  

#### Exemples:

```
// Test 1: Common elements between number arrays
const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];
const result1 = a.intersectLinq(b);
console.log('Test 1:', result1);
// Expected: [3, 4]

// Test 2: String arrays
const nomes1 = ['Romulo', 'Bia', 'Felipe'];
const nomes2 = ['Bia', 'Carlos', 'Felipe'];
const result2 = nomes1.intersectLinq(nomes2);
console.log('Test 2:', result2);
// Expected: ['Bia', 'Felipe']

// Test 3: One array is empty
const empty: number[] = [];
const result3 = a.intersectLinq(empty);
console.log('Test 3:', result3);
// Expected: []

// Test 4: Both arrays are empty
const result4 = empty.intersectLinq([]);
console.log('Test 4:', result4);
// Expected: []

// Test 5: Duplicates in original array
const nums = [1, 2, 2, 3, 4];
const result5 = nums.intersectLinq([2, 4]);
console.log('Test 5:', result5);
// Expected: [2, 4]

// Test 6: Passing undefined (should throw)
try {
  const result6 = a.intersectLinq(undefined as any);
  console.log('Test 6:', result6);
} catch (err) {
  console.log('Test 6: correctly threw error ->', (err as Error).message);
}
// Expected: Error "Parameter must be an array"
```
<hr style="border: 1; height: 2px; background: #eee;" />

### UnionLinq

**unionLinq** method combines two arrays and returns a new array containing distinct elements from both. You can optionally provide a custom comparer function to define equality logic, such as when comparing objects. Without a comparer, strict equality (===) is used.  

#### Exemples:

```
// Test 1
const u1 = [1, 2, 3].unionLinq([3, 4, 5]);
console.log('Test 1:', u1); // Expected: [1, 2, 3, 4, 5]

// Test 2: Strings
const u2 = ['Romulo', 'Bia'].unionLinq(['Bia', 'Felipe']);
console.log('Test 2:', u2); // Expected: ['Romulo', 'Bia', 'Felipe']

// Test 3: 
const o1 = [{ id: 1 }];
const o2 = [{ id: 1 }, { id: 2 }];
const u3 = o1.unionLinq(o2);
console.log('Test 3:', u3); // Expected: 3 items (by reference)

// Test 4
const u4 = o1.unionLinq(o2, (a, b) => a.id === b.id);
console.log('Test 4:', u4); // Expected: [{ id: 1 }, { id: 2 }]

// Test 5
const u5 = [].unionLinq([1, 2, 3]);
console.log('Test 5:', u5); // Expected: [1, 2, 3]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ↕️ Sorting
### OrderByLinq

**orderByLinq** method sorts the elements of a sequence in ascending order according to a key selector function.  

#### Exemples:

```
console.log('Test: orderByLinq');
const users = [
  { id: 3, name: 'Felipe' },
  { id: 1, name: 'Romulo' },
  { id: 2, name: 'Bia' }
];

const orderedById = users.orderByLinq(u => u.id);
console.log(orderedById);

const names = ['Romulo', 'Bia', 'Felipe'];
const ordenadoAsc = names.orderByLinq(n => n);
console.log(ordenadoAsc); 
// Expected: ['Bia', 'Felipe', 'Romulo']
```
<hr style="border: 1; height: 2px; background: #eee;" />

### OrderByDescendingLinq

**orderByDescendingLinq** method sorts the elements of a sequence in descending order according to a key selector function.  

#### Exemples:

```
const nums = [5, 3, 9, 1];
const sortedNums = nums.orderByDescendingLinq(x => x);
console.log(sortedNums);
// sortedNums = [9, 5, 3, 1]

const users = [
  { name: 'Romulo', age: 30 },
  { name: 'Bia', age: 25 },
  { name: 'Felipe', age: 35 }
];
const sortedUsers = users.orderByDescendingLinq(u => u.age);
console.log(sortedUsers);
// sortedUsers = [
//   { name: 'Felipe', age: 35 },
//   { name: 'Romulo', age: 30 },
//   { name: 'Bia', age: 25 }
// ]

const sortedUserName = users.orderByDescendingLinq(u => u.name);
console.log(sortedUserName);
// sortedUsers = [
// { name: 'Romulo', age: 30 }
// { name: 'Felipe', age: 35 },
// { name: 'Bia', age: 25 }
// ]
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ThenByLinq

**thenByLinq** method performs a secondary ascending sort on a sequence that has already been ordered.  

#### Exemples:

```
console.log('Test: thenByLinq');
const pessoas1 = [
  { nome: 'Romulo', idade: 30 },
  { nome: 'Bia', idade: 25 },
  { nome: 'Felipe', idade: 25 },
];
const sortedAsc = pessoas1
  .orderByLinq(p => p.idade)
  .thenByLinq(p => p.nome);
console.log(sortedAsc);
/*
Expected:
[
  { nome: 'Bia', idade: 25 },
  { nome: 'Felipe', idade: 25 },
  { nome: 'Romulo', idade: 30 }
]
*/
```
<hr style="border: 1; height: 2px; background: #eee;" />

### ThenByDescendingLinq

**thenByDescendingLinq** method performs a secondary descending sort on a sequence that has already been ordered.  

#### Exemples:

```
console.log('Test: thenByDescendingLinq');
const pessoas2 = [
  { nome: 'Romulo', idade: 30 },
  { nome: 'Bia', idade: 25 },
  { nome: 'Felipe', idade: 25 },
];
const sortedDesc = pessoas2
  .orderByLinq(p => p.idade)
  .thenByDescendingLinq(p => p.nome);
console.log(sortedDesc);
/*
Expected:
[
  { nome: 'Felipe', idade: 25 },
  { nome: 'Bia', idade: 25 },
  { nome: 'Romulo', idade: 30 }
]
*/
```
<hr style="border: 1; height: 2px; background: #eee;" />


## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Romulo Ribeiro