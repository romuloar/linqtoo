# LinqToo

Uma biblioteca TypeScript que implementa os m�todos de LINQ do C# para manipula��o de cole��es.

## Instala��o

```bash
npm install linqtoo
```

## Uso B�sico

```typescript
import { Collection } from 'linqtoo';

// Crie uma cole��o a partir de um array
const numbers = new Collection([1, 2, 3, 4, 5]);

// Use os m�todos de LINQ
const evenNumbers = numbers.where(x => x % 2 === 0).toArray();
console.log(evenNumbers); // [2, 4]
```

## M�todos Dispon�veis

### `aggregate`

Aplica uma fun��o acumuladora em uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Somar todos os n�meros
const numbers = new Collection([1, 2, 3, 4]);
const sum = numbers.aggregate((acc, val) => acc + val);
console.log(sum); // 10

// Exemplo 2: Concatenar strings com separador
const words = new Collection(["hello", "world", "linq"]);
const sentence = words.aggregate((acc, val) => acc + " " + val, "");
console.log(sentence.trim()); // "hello world linq"
```

### `all`

Determina se todos os elementos da sequ�ncia satisfazem uma condi��o.

**Exemplos:**

```typescript
// Exemplo 1: Verificar se todos os n�meros s�o positivos
const numbers = new Collection([1, 2, 3, 4]);
const allPositive = numbers.all(x => x > 0);
console.log(allPositive); // true

// Exemplo 2: Verificar se todos os n�meros s�o pares
const evenCheck = numbers.all(x => x % 2 === 0);
console.log(evenCheck); // false
```

### `any`

Determina se algum elemento da sequ�ncia satisfaz uma condi��o.

**Exemplos:**

```typescript
// Exemplo 1: Verificar se existe algum n�mero par
const numbers = new Collection([1, 2, 3, 4]);
const hasEven = numbers.any(x => x % 2 === 0);
console.log(hasEven); // true

// Exemplo 2: Verificar se existe algum n�mero maior que 10
const hasLarge = numbers.any(x => x > 10);
console.log(hasLarge); // false
```

### `append`

Adiciona um valor ao final da sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Adicionar um n�mero ao final da cole��o
const numbers = new Collection([1, 2, 3]);
const withFour = numbers.append(4);
console.log(withFour.toArray()); // [1, 2, 3, 4]

// Exemplo 2: Adicionar um objeto a uma cole��o de objetos
const users = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const withCarol = users.append({id: 3, name: "Carol"});
console.log(withCarol.toArray()); // [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}, {id: 3, name: "Carol"}]
```

### `average`

Calcula a m�dia dos valores na sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: M�dia de uma cole��o de n�meros
const numbers = new Collection([2, 4, 6, 8]);
const avg = numbers.average();
console.log(avg); // 5

// Exemplo 2: M�dia de idades de uma cole��o de pessoas
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 35 }
]);
const avgAge = people.average(p => p.age);
console.log(avgAge); // 30
```

### `concat`

Concatena duas sequ�ncias.

**Exemplos:**

```typescript
// Exemplo 1: Concatenar duas cole��es de n�meros
const first = new Collection([1, 2, 3]);
const second = new Collection([4, 5, 6]);
const combined = first.concat(second);
console.log(combined.toArray()); // [1, 2, 3, 4, 5, 6]

// Exemplo 2: Concatenar arrays de diferentes tipos
const numbers = new Collection([1, 2, 3]);
const moreNumbers = [4, 5, 6];
const allNumbers = numbers.concat(moreNumbers);
console.log(allNumbers.toArray()); // [1, 2, 3, 4, 5, 6]
```

### `contains`

Determina se uma sequ�ncia cont�m um elemento espec�fico.

**Exemplos:**

```typescript
// Exemplo 1: Verificar se uma cole��o cont�m um n�mero
const numbers = new Collection([1, 2, 3, 4, 5]);
const hasThree = numbers.contains(3);
console.log(hasThree); // true

// Exemplo 2: Verificar com um comparador personalizado
const people = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const hasBob = people.contains({id: 2, name: "Bob"}, (a, b) => a.id === b.id);
console.log(hasBob); // true
```

### `count`

Retorna o n�mero de elementos em uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Contar todos os elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const total = numbers.count();
console.log(total); // 5

// Exemplo 2: Contar elementos que satisfazem uma condi��o
const evenCount = numbers.count(x => x % 2 === 0);
console.log(evenCount); // 2
```

### `defaultIfEmpty`

Retorna os elementos da sequ�ncia ou um valor padr�o em uma sequ�ncia se ela estiver vazia.

**Exemplos:**

```typescript
// Exemplo 1: Cole��o n�o vazia retorna seus pr�prios elementos
const numbers = new Collection([1, 2, 3]);
const result1 = numbers.defaultIfEmpty(0);
console.log(result1.toArray()); // [1, 2, 3]

// Exemplo 2: Cole��o vazia retorna o valor padr�o
const empty = new Collection<number>([]);
const result2 = empty.defaultIfEmpty(0);
console.log(result2.toArray()); // [0]
```

### `distinct`

Retorna elementos distintos de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: N�meros distintos
const numbers = new Collection([1, 2, 2, 3, 3, 3, 4, 5, 5]);
const distinctNumbers = numbers.distinct();
console.log(distinctNumbers.toArray()); // [1, 2, 3, 4, 5]

// Exemplo 2: Objetos distintos baseados em uma propriedade
const users = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice (duplicate)" }
]);
const distinctUsers = users.distinct(user => user.id);
console.log(distinctUsers.toArray()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

### `elementAt`

Retorna o elemento em um �ndice espec�fico.

**Exemplos:**

```typescript
// Exemplo 1: Obter o terceiro elemento
const letters = new Collection(["a", "b", "c", "d", "e"]);
const thirdLetter = letters.elementAt(2);
console.log(thirdLetter); // "c"

// Exemplo 2: Tentar obter um elemento fora dos limites
try {
  const outOfBounds = letters.elementAt(10);
} catch (e) {
  console.log("Erro capturado: �ndice fora dos limites");
}
```

### `elementAtOrDefault`

Retorna o elemento em um �ndice espec�fico ou um valor padr�o se o �ndice estiver fora dos limites.

**Exemplos:**

```typescript
// Exemplo 1: Obter o terceiro elemento
const letters = new Collection(["a", "b", "c", "d", "e"]);
const thirdLetter = letters.elementAtOrDefault(2);
console.log(thirdLetter); // "c"

// Exemplo 2: �ndice fora dos limites retorna o valor padr�o
const outOfBounds = letters.elementAtOrDefault(10, "z");
console.log(outOfBounds); // "z"
```

### `except`

Produz a diferen�a de conjunto entre duas sequ�ncias.

**Exemplos:**

```typescript
// Exemplo 1: Remover n�meros espec�ficos
const numbers = new Collection([1, 2, 3, 4, 5]);
const toRemove = [2, 4];
const result = numbers.except(toRemove);
console.log(result.toArray()); // [1, 3, 5]

// Exemplo 2: Diferen�a entre cole��es com comparador personalizado
const users1 = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const users2 = [{id: 2, name: "Bob"}, {id: 3, name: "Carol"}];
const uniqueUsers = users1.except(users2, (a, b) => a.id === b.id);
console.log(uniqueUsers.toArray()); // [{id: 1, name: "Alice"}]
```

### `first`

Retorna o primeiro elemento de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Obter o primeiro elemento
const numbers = new Collection([1, 2, 3, 4, 5]);
const first = numbers.first();
console.log(first); // 1

// Exemplo 2: Obter o primeiro elemento que satisfaz uma condi��o
const firstEven = numbers.first(x => x % 2 === 0);
console.log(firstEven); // 2
```

### `firstOrDefault`

Retorna o primeiro elemento da sequ�ncia ou um valor padr�o se a sequ�ncia estiver vazia.

**Exemplos:**

```typescript
// Exemplo 1: Obter o primeiro elemento de uma cole��o n�o vazia
const numbers = new Collection([1, 2, 3, 4, 5]);
const first = numbers.firstOrDefault(null);
console.log(first); // 1

// Exemplo 2: Obter o primeiro elemento que satisfaz uma condi��o ou valor padr�o
const firstBigNumber = numbers.firstOrDefault(null, x => x > 10);
console.log(firstBigNumber); // null (nenhum n�mero � maior que 10)
```

### `forEach`

Executa uma fun��o para cada elemento na sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Imprimir cada elemento
const numbers = new Collection([1, 2, 3]);
numbers.forEach(num => console.log(`N�mero: ${num}`));
// Sa�da:
// N�mero: 1
// N�mero: 2
// N�mero: 3

// Exemplo 2: Acumular em uma vari�vel externa
let sum = 0;
numbers.forEach(num => sum += num);
console.log(`Soma: ${sum}`); // Soma: 6
```

### `groupBy`

Agrupa elementos de acordo com uma chave especificada.

**Exemplos:**

```typescript
// Exemplo 1: Agrupar n�meros por paridade
const numbers = new Collection([1, 2, 3, 4, 5, 6]);
const grouped = numbers.groupBy(n => n % 2 === 0 ? "pares" : "�mpares");
console.log(grouped.toArray());
// [
//   { key: "�mpares", values: [1, 3, 5] },
//   { key: "pares", values: [2, 4, 6] }
// ]

// Exemplo 2: Agrupar pessoas por inicial do nome
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

### `groupJoin`

Correlaciona elementos de duas sequ�ncias com base na igualdade de chaves e agrupa os resultados.

**Exemplos:**

```typescript
// Exemplo 1: Juntar departamentos com seus funcion�rios
const departments = new Collection([
  { id: 1, name: "TI" },
  { id: 2, name: "RH" },
  { id: 3, name: "Vendas" }
]);

const employees = [
  { deptId: 1, name: "Alice" },
  { deptId: 1, name: "Bob" },
  { deptId: 2, name: "Carol" },
  { deptId: 2, name: "Dave" },
  { deptId: 4, name: "Eve" }  // departamento n�o existente
];

const result = departments.groupJoin(
  employees,
  dept => dept.id,
  emp => emp.deptId,
  (dept, emps) => ({
    department: dept.name,
    employees: emps.map(e => e.name)
  })
);

console.log(result.toArray());
// [
//   { department: "TI", employees: ["Alice", "Bob"] },
//   { department: "RH", employees: ["Carol", "Dave"] },
//   { department: "Vendas", employees: [] }
// ]

// Exemplo 2: Juntar cursos com estudantes
const courses = new Collection([
  { id: 101, name: "JavaScript" },
  { id: 102, name: "TypeScript" }
]);

const students = [
  { courseId: 101, name: "Ana" },
  { courseId: 102, name: "Bruno" },
  { courseId: 101, name: "Carlos" }
];

const enrollments = courses.groupJoin(
  students,
  course => course.id,
  student => student.courseId,
  (course, students) => ({
    course: course.name,
    studentCount: students.length,
    students: students.map(s => s.name)
  })
);

console.log(enrollments.toArray());
// [
//   { course: "JavaScript", studentCount: 2, students: ["Ana", "Carlos"] },
//   { course: "TypeScript", studentCount: 1, students: ["Bruno"] }
// ]
```

### `intersect`

Produz a interse��o de conjunto de duas sequ�ncias.

**Exemplos:**

```typescript
// Exemplo 1: Encontrar n�meros comuns entre duas cole��es
const first = new Collection([1, 2, 3, 4, 5]);
const second = [3, 4, 5, 6, 7];
const common = first.intersect(second);
console.log(common.toArray()); // [3, 4, 5]

// Exemplo 2: Interse��o de objetos com comparador personalizado
const users1 = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
]);
const users2 = [
  { id: 2, name: "Bob (novo)" },
  { id: 3, name: "Carol (novo)" },
  { id: 4, name: "Dave" }
];
const commonUsers = users1.intersect(users2, (a, b) => a.id === b.id);
console.log(commonUsers.toArray()); // [{ id: 2, name: "Bob" }, { id: 3, name: "Carol" }]
```

### `join`

Correlaciona elementos de duas sequ�ncias com base em chaves correspondentes.

**Exemplos:**

```typescript
// Exemplo 1: Juntar produtos com categorias
const categories = new Collection([
  { id: 1, name: "Eletr�nicos" },
  { id: 2, name: "Livros" }
]);

const products = [
  { categoryId: 1, name: "Laptop" },
  { categoryId: 1, name: "Smartphone" },
  { categoryId: 2, name: "TypeScript Guia Pr�tico" },
  { categoryId: 3, name: "T�nis" } // Categoria que n�o existe
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
//   { product: "Laptop", category: "Eletr�nicos" },
//   { product: "Smartphone", category: "Eletr�nicos" },
//   { product: "TypeScript Guia Pr�tico", category: "Livros" }
// ]

// Exemplo 2: Juntar alunos e suas notas
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

Retorna o �ltimo elemento de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Obter o �ltimo elemento
const numbers = new Collection([1, 2, 3, 4, 5]);
const last = numbers.last();
console.log(last); // 5

// Exemplo 2: Obter o �ltimo elemento que satisfaz uma condi��o
const lastEven = numbers.last(x => x % 2 === 0);
console.log(lastEven); // 4
```

### `lastOrDefault`

Retorna o �ltimo elemento da sequ�ncia ou um valor padr�o se a sequ�ncia estiver vazia.

**Exemplos:**

```typescript
// Exemplo 1: Obter o �ltimo elemento de uma cole��o n�o vazia
const numbers = new Collection([1, 2, 3, 4, 5]);
const last = numbers.lastOrDefault(0);
console.log(last); // 5

// Exemplo 2: Obter o �ltimo elemento que satisfaz uma condi��o ou valor padr�o
const lastBigNumber = numbers.lastOrDefault(0, x => x > 10);
console.log(lastBigNumber); // 0 (nenhum n�mero � maior que 10)
```

### `max`

Retorna o valor m�ximo em uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Encontrar o maior n�mero
const numbers = new Collection([1, 5, 3, 9, 2]);
const max = numbers.max();
console.log(max); // 9

// Exemplo 2: Encontrar a pessoa mais velha
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const oldestAge = people.max(p => p.age);
console.log(oldestAge); // 40
```

### `min`

Retorna o valor m�nimo em uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Encontrar o menor n�mero
const numbers = new Collection([5, 3, 9, 1, 2]);
const min = numbers.min();
console.log(min); // 1

// Exemplo 2: Encontrar a pessoa mais jovem
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
  { name: "Carol", age: 35 }
]);
const youngestAge = people.min(p => p.age);
console.log(youngestAge); // 25
```

### `orderBy`

Ordena os elementos de uma sequ�ncia em ordem crescente.

**Exemplos:**

```typescript
// Exemplo 1: Ordenar n�meros
const numbers = new Collection([5, 3, 9, 1, 2]);
const ordered = numbers.orderBy(x => x);
console.log(ordered.toArray()); // [1, 2, 3, 5, 9]

// Exemplo 2: Ordenar pessoas por idade
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

Ordena os elementos de uma sequ�ncia em ordem decrescente.

**Exemplos:**

```typescript
// Exemplo 1: Ordenar n�meros em ordem decrescente
const numbers = new Collection([5, 3, 9, 1, 2]);
const descendingOrder = numbers.orderByDescending(x => x);
console.log(descendingOrder.toArray()); // [9, 5, 3, 2, 1]

// Exemplo 2: Ordenar pessoas por idade em ordem decrescente
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

### `prepend`

Adiciona um valor ao in�cio da sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Adicionar um n�mero ao in�cio da cole��o
const numbers = new Collection([2, 3, 4]);
const withOne = numbers.prepend(1);
console.log(withOne.toArray()); // [1, 2, 3, 4]

// Exemplo 2: Adicionar um objeto ao in�cio de uma cole��o
const users = new Collection([
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
]);
const withAlice = users.prepend({ id: 1, name: "Alice" });
console.log(withAlice.toArray());
// [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Carol" }
// ]
```

### `reverse`

Inverte a ordem dos elementos em uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Inverter uma cole��o de n�meros
const numbers = new Collection([1, 2, 3, 4, 5]);
const reversed = numbers.reverse();
console.log(reversed.toArray()); // [5, 4, 3, 2, 1]

// Exemplo 2: Inverter uma cole��o de strings
const words = new Collection(["primeiro", "segundo", "terceiro"]);
const reversedWords = words.reverse();
console.log(reversedWords.toArray()); // ["terceiro", "segundo", "primeiro"]
```

### `select`

Projeta cada elemento de uma sequ�ncia em uma nova forma.

**Exemplos:**

```typescript
// Exemplo 1: Dobrar cada n�mero
const numbers = new Collection([1, 2, 3, 4]);
const doubled = numbers.select(x => x * 2);
console.log(doubled.toArray()); // [2, 4, 6, 8]

// Exemplo 2: Extrair propriedades espec�ficas de objetos
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

Projeta cada elemento de uma sequ�ncia em uma nova sequ�ncia e aplana o resultado.

**Exemplos:**

```typescript
// Exemplo 1: Converter array de arrays em um �nico array plano
const arrays = new Collection([[1, 2], [3, 4], [5, 6]]);
const flattened = arrays.selectMany(arr => arr);
console.log(flattened.toArray()); // [1, 2, 3, 4, 5, 6]

// Exemplo 2: Obter todas as tags de uma lista de artigos
const articles = new Collection([
  { title: "TypeScript Basics", tags: ["typescript", "programming"] },
  { title: "LINQ in TypeScript", tags: ["typescript", "linq", "collections"] }
]);
const allTags = articles.selectMany(article => article.tags);
console.log(allTags.toArray()); // ["typescript", "programming", "typescript", "linq", "collections"]
```

### `sequenceEqual`

Determina se duas sequ�ncias s�o iguais comparando seus elementos.

**Exemplos:**

```typescript
// Exemplo 1: Comparar duas cole��es de n�meros
const first = new Collection([1, 2, 3]);
const second = [1, 2, 3];
const isEqual = first.sequenceEqual(second);
console.log(isEqual); // true

// Exemplo 2: Comparar com comparador personalizado
const users1 = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const users2 = [{id: 1, name: "Alice (copy)"}, {id: 2, name: "Bob (copy)"}];
const areEqual = users1.sequenceEqual(users2, (a, b) => a.id === b.id);
console.log(areEqual); // true
```

### `single`

Retorna o �nico elemento de uma sequ�ncia que satisfaz uma condi��o.

**Exemplos:**

```typescript
// Exemplo 1: Obter o �nico elemento que satisfaz uma condi��o
const numbers = new Collection([1, 2, 3, 4, 5]);
try {
  const onlyThree = numbers.single(x => x === 3);
  console.log(onlyThree); // 3
} catch (e) {
  console.log("Erro: m�ltiplos elementos ou nenhum elemento encontrado");
}

// Exemplo 2: Tentar obter um elemento onde v�rios satisfazem a condi��o
try {
  const evenNumber = numbers.single(x => x % 2 === 0);
} catch (e) {
  console.log("Erro: m�ltiplos elementos encontrados"); // Ser� exibido, pois existem dois n�meros pares
}
```

### `singleOrDefault`

Retorna o �nico elemento de uma sequ�ncia que satisfaz uma condi��o ou um valor padr�o se nenhum existir.

**Exemplos:**

```typescript
// Exemplo 1: Obter o �nico elemento que satisfaz uma condi��o
const numbers = new Collection([1, 2, 3, 4, 5]);
const onlyThree = numbers.singleOrDefault(0, x => x === 3);
console.log(onlyThree); // 3

// Exemplo 2: Obter valor padr�o quando nenhum elemento satisfaz a condi��o
const bigNumber = numbers.singleOrDefault(0, x => x > 10);
console.log(bigNumber); // 0

// Exemplo 3: Lan�ar exce��o quando m�ltiplos elementos satisfazem a condi��o
try {
  const evenNumber = numbers.singleOrDefault(0, x => x % 2 === 0);
} catch (e) {
  console.log("Erro: m�ltiplos elementos encontrados"); // Ser� exibido
}
```

### `skip`

Ignora um n�mero especificado de elementos no in�cio de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Pular os dois primeiros elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const skipped = numbers.skip(2);
console.log(skipped.toArray()); // [3, 4, 5]

// Exemplo 2: Pular mais elementos do que existem na cole��o
const tooManySkipped = numbers.skip(10);
console.log(tooManySkipped.toArray()); // [] (cole��o vazia)
```

### `skipLast`

Ignora um n�mero especificado de elementos no final de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Pular os dois �ltimos elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const withoutLast = numbers.skipLast(2);
console.log(withoutLast.toArray()); // [1, 2, 3]

// Exemplo 2: Pular mais elementos do que existem na cole��o
const letters = new Collection(["a", "b", "c"]);
const tooManySkipped = letters.skipLast(5);
console.log(tooManySkipped.toArray()); // [] (cole��o vazia)
```

### `skipWhile`

Ignora elementos em uma sequ�ncia enquanto uma condi��o for verdadeira.

**Exemplos:**

```typescript
// Exemplo 1: Pular n�meros menores que 3
const numbers = new Collection([1, 2, 3, 4, 5, 1, 2]);
const skipped = numbers.skipWhile(x => x < 3);
console.log(skipped.toArray()); // [3, 4, 5, 1, 2]

// Exemplo 2: Pular com �ndice na condi��o
const data = new Collection([2, 4, 6, 8, 1, 3]);
const result = data.skipWhile((x, index) => x > index * 2);
console.log(result.toArray()); // [1, 3]
```

### `sum`

Calcula a soma dos valores em uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Soma de n�meros
const numbers = new Collection([1, 2, 3, 4, 5]);
const sum = numbers.sum();
console.log(sum); // 15

// Exemplo 2: Soma de propriedades de objetos
const products = new Collection([
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
]);
const totalPrice = products.sum(p => p.price);
console.log(totalPrice); // 1100
```

### `take`

Retorna um n�mero especificado de elementos do in�cio de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Pegar os tr�s primeiros elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const firstThree = numbers.take(3);
console.log(firstThree.toArray()); // [1, 2, 3]

// Exemplo 2: Tentar pegar mais elementos do que existem
const moreNumbers = numbers.take(10);
console.log(moreNumbers.toArray()); // [1, 2, 3, 4, 5] (todos os elementos dispon�veis)
```

### `takeLast`

Retorna um n�mero especificado de elementos do final de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Pegar os dois �ltimos elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const lastTwo = numbers.takeLast(2);
console.log(lastTwo.toArray()); // [4, 5]

// Exemplo 2: Tentar pegar mais elementos do que existem
const letters = new Collection(["a", "b", "c"]);
const allLetters = letters.takeLast(5);
console.log(allLetters.toArray()); // ["a", "b", "c"] (todos os elementos dispon�veis)
```

### `takeWhile`

Retorna elementos de uma sequ�ncia enquanto uma condi��o for verdadeira.

**Exemplos:**

```typescript
// Exemplo 1: Pegar n�meros menores que 4
const numbers = new Collection([1, 2, 3, 4, 1, 2]);
const lessThanFour = numbers.takeWhile(x => x < 4);
console.log(lessThanFour.toArray()); // [1, 2, 3]

// Exemplo 2: Pegar com �ndice na condi��o
const data = new Collection([2, 4, 6, 8, 1, 3]);
const result = data.takeWhile((x, index) => x > index);
console.log(result.toArray()); // [2, 4, 6, 8]
```

### `thenBy`

Realiza uma ordena��o secund�ria dos elementos.

**Exemplos:**

```typescript
// Exemplo 1: Ordenar pessoas por idade e depois por nome
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

// Exemplo 2: Ordenar produtos por categoria e depois por pre�o
const products = new Collection([
  { name: "Mouse", category: "Perif�ricos", price: 25 },
  { name: "Teclado", category: "Perif�ricos", price: 50 },
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
//   { name: "Mouse", category: "Perif�ricos", price: 25 },
//   { name: "Teclado", category: "Perif�ricos", price: 50 }
// ]
```

### `thenByDescending`

Realiza uma ordena��o secund�ria decrescente dos elementos.

**Exemplos:**

```typescript
// Exemplo 1: Ordenar pessoas por idade ascendente e depois por nome descendente
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

// Exemplo 2: Ordenar produtos por categoria e depois por pre�o descendente
const products = new Collection([
  { name: "Mouse", category: "Perif�ricos", price: 25 },
  { name: "Teclado", category: "Perif�ricos", price: 50 },
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
//   { name: "Teclado", category: "Perif�ricos", price: 50 },
//   { name: "Mouse", category: "Perif�ricos", price: 25 }
// ]
```

### `toArray`

Converte uma sequ�ncia em um array.

**Exemplos:**

```typescript
// Exemplo 1: Converter uma cole��o filtrada em array
const numbers = new Collection([1, 2, 3, 4, 5]);
const evenArray = numbers.where(x => x % 2 === 0).toArray();
console.log(evenArray); // [2, 4]

// Exemplo 2: Converter uma cole��o mapeada em array
const doubled = numbers.select(x => x * 2).toArray();
console.log(doubled); // [2, 4, 6, 8, 10]
```

### `toDictionary`

Cria um dicion�rio a partir de uma sequ�ncia de acordo com uma fun��o de chave especificada.

**Exemplos:**

```typescript
// Exemplo 1: Criar dicion�rio de usu�rios por ID
const users = new Collection([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" }
]);

const userDict = users.toDictionary(
  user => user.id,
  user => user.name
);

console.log(userDict);
// {
//   1: "Alice",
//   2: "Bob",
//   3: "Carol"
// }

// Exemplo 2: Criar dicion�rio de palavras por comprimento
const words = new Collection(["um", "dois", "tr�s", "quatro"]);
const byLength = words.toDictionary(
  word => word.length,
  word => word
);

console.log(byLength);
// {
//   2: "um",
//   4: "dois",
//   5: "tr�s",
//   6: "quatro"
// }
```

### `toList`

Cria uma lista a partir de uma sequ�ncia.

**Exemplos:**

```typescript
// Exemplo 1: Converter uma cole��o em lista
const numbers = new Collection([1, 2, 3, 4, 5]);
const list = numbers.toList();
console.log(list); // [1, 2, 3, 4, 5]

// Exemplo 2: Converter uma cole��o filtrada em lista
const evenList = numbers.where(x => x % 2 === 0).toList();
console.log(evenList); // [2, 4]
```

### `toLookup`

Cria um lookup (dicion�rio de arrays) a partir de uma sequ�ncia de acordo com uma fun��o de chave especificada.

**Exemplos:**

```typescript
// Exemplo 1: Agrupar pessoas por idade
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 25 },
  { name: "Dave", age: 30 }
]);

const byAge = people.toLookup(
  p => p.age,
  p => p.name
);

console.log(byAge);
// {
//   25: ["Alice", "Carol"],
//   30: ["Bob", "Dave"]
// }

// Exemplo 2: Agrupar palavras por primeira letra
const words = new Collection(["apple", "banana", "apricot", "blueberry"]);
const byFirstLetter = words.toLookup(
  word => word[0],
  word => word
);

console.log(byFirstLetter);
// {
//   a: ["apple", "apricot"],
//   b: ["banana", "blueberry"]
// }
```

### `union`

Produz a uni�o de conjunto de duas sequ�ncias.

**Exemplos:**

```typescript
// Exemplo 1: Uni�o de duas cole��es de n�meros
const first = new Collection([1, 2, 3]);
const second = [3, 4, 5];
const union = first.union(second);
console.log(union.toArray()); // [1, 2, 3, 4, 5]

// Exemplo 2: Uni�o de cole��es de objetos com comparador personalizado
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

Filtra uma sequ�ncia com base em um predicado.

**Exemplos:**

```typescript
// Exemplo 1: Filtrar n�meros pares
const numbers = new Collection([1, 2, 3, 4, 5, 6]);
const evens = numbers.where(x => x % 2 === 0);
console.log(evens.toArray()); // [2, 4, 6]

// Exemplo 2: Filtrar pessoas com idade maior que 30
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

Aplica uma fun��o a elementos correspondentes de duas sequ�ncias, produzindo uma sequ�ncia de resultados.

**Exemplos:**

```typescript
// Exemplo 1: Combinar duas cole��es de n�meros
const first = new Collection([1, 2, 3]);
const second = [4, 5, 6];
const zipped = first.zip(second, (a, b) => a + b);
console.log(zipped.toArray()); // [5, 7, 9]

// Exemplo 2: Combinar nomes e sobrenomes
const firstNames = new Collection(["Alice", "Bob", "Carol"]);
const lastNames = ["Smith", "Johnson", "Williams"];
const fullNames = firstNames.zip(lastNames, (first, last) => `${first} ${last}`);
console.log(fullNames.toArray());
// ["Alice Smith", "Bob Johnson", "Carol Williams"]
```

## Contribui��o

Contribui��es s�o bem-vindas! Por favor, sinta-se � vontade para enviar um Pull Request.

## Licen�a

MIT
