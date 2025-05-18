# LinqToo

Uma biblioteca TypeScript que implementa os métodos de LINQ do C# para manipulação de coleções.

## Instalação

```bash
npm install linqtoo
```

## Uso Básico

```typescript
import { Collection } from 'linqtoo';

// Crie uma coleção a partir de um array
const numbers = new Collection([1, 2, 3, 4, 5]);

// Use os métodos de LINQ
const evenNumbers = numbers.where(x => x % 2 === 0).toArray();
console.log(evenNumbers); // [2, 4]
```

## Métodos Disponíveis

### `aggregate`

Aplica uma função acumuladora em uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Somar todos os números
const numbers = new Collection([1, 2, 3, 4]);
const sum = numbers.aggregate((acc, val) => acc + val);
console.log(sum); // 10

// Exemplo 2: Concatenar strings com separador
const words = new Collection(["hello", "world", "linq"]);
const sentence = words.aggregate((acc, val) => acc + " " + val, "");
console.log(sentence.trim()); // "hello world linq"
```

### `all`

Determina se todos os elementos da sequência satisfazem uma condição.

**Exemplos:**

```typescript
// Exemplo 1: Verificar se todos os números são positivos
const numbers = new Collection([1, 2, 3, 4]);
const allPositive = numbers.all(x => x > 0);
console.log(allPositive); // true

// Exemplo 2: Verificar se todos os números são pares
const evenCheck = numbers.all(x => x % 2 === 0);
console.log(evenCheck); // false
```

### `any`

Determina se algum elemento da sequência satisfaz uma condição.

**Exemplos:**

```typescript
// Exemplo 1: Verificar se existe algum número par
const numbers = new Collection([1, 2, 3, 4]);
const hasEven = numbers.any(x => x % 2 === 0);
console.log(hasEven); // true

// Exemplo 2: Verificar se existe algum número maior que 10
const hasLarge = numbers.any(x => x > 10);
console.log(hasLarge); // false
```

### `append`

Adiciona um valor ao final da sequência.

**Exemplos:**

```typescript
// Exemplo 1: Adicionar um número ao final da coleção
const numbers = new Collection([1, 2, 3]);
const withFour = numbers.append(4);
console.log(withFour.toArray()); // [1, 2, 3, 4]

// Exemplo 2: Adicionar um objeto a uma coleção de objetos
const users = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const withCarol = users.append({id: 3, name: "Carol"});
console.log(withCarol.toArray()); // [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}, {id: 3, name: "Carol"}]
```

### `average`

Calcula a média dos valores na sequência.

**Exemplos:**

```typescript
// Exemplo 1: Média de uma coleção de números
const numbers = new Collection([2, 4, 6, 8]);
const avg = numbers.average();
console.log(avg); // 5

// Exemplo 2: Média de idades de uma coleção de pessoas
const people = new Collection([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 35 }
]);
const avgAge = people.average(p => p.age);
console.log(avgAge); // 30
```

### `concat`

Concatena duas sequências.

**Exemplos:**

```typescript
// Exemplo 1: Concatenar duas coleções de números
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

Determina se uma sequência contém um elemento específico.

**Exemplos:**

```typescript
// Exemplo 1: Verificar se uma coleção contém um número
const numbers = new Collection([1, 2, 3, 4, 5]);
const hasThree = numbers.contains(3);
console.log(hasThree); // true

// Exemplo 2: Verificar com um comparador personalizado
const people = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const hasBob = people.contains({id: 2, name: "Bob"}, (a, b) => a.id === b.id);
console.log(hasBob); // true
```

### `count`

Retorna o número de elementos em uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Contar todos os elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const total = numbers.count();
console.log(total); // 5

// Exemplo 2: Contar elementos que satisfazem uma condição
const evenCount = numbers.count(x => x % 2 === 0);
console.log(evenCount); // 2
```

### `defaultIfEmpty`

Retorna os elementos da sequência ou um valor padrão em uma sequência se ela estiver vazia.

**Exemplos:**

```typescript
// Exemplo 1: Coleção não vazia retorna seus próprios elementos
const numbers = new Collection([1, 2, 3]);
const result1 = numbers.defaultIfEmpty(0);
console.log(result1.toArray()); // [1, 2, 3]

// Exemplo 2: Coleção vazia retorna o valor padrão
const empty = new Collection<number>([]);
const result2 = empty.defaultIfEmpty(0);
console.log(result2.toArray()); // [0]
```

### `distinct`

Retorna elementos distintos de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Números distintos
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

Retorna o elemento em um índice específico.

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
  console.log("Erro capturado: índice fora dos limites");
}
```

### `elementAtOrDefault`

Retorna o elemento em um índice específico ou um valor padrão se o índice estiver fora dos limites.

**Exemplos:**

```typescript
// Exemplo 1: Obter o terceiro elemento
const letters = new Collection(["a", "b", "c", "d", "e"]);
const thirdLetter = letters.elementAtOrDefault(2);
console.log(thirdLetter); // "c"

// Exemplo 2: Índice fora dos limites retorna o valor padrão
const outOfBounds = letters.elementAtOrDefault(10, "z");
console.log(outOfBounds); // "z"
```

### `except`

Produz a diferença de conjunto entre duas sequências.

**Exemplos:**

```typescript
// Exemplo 1: Remover números específicos
const numbers = new Collection([1, 2, 3, 4, 5]);
const toRemove = [2, 4];
const result = numbers.except(toRemove);
console.log(result.toArray()); // [1, 3, 5]

// Exemplo 2: Diferença entre coleções com comparador personalizado
const users1 = new Collection([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
const users2 = [{id: 2, name: "Bob"}, {id: 3, name: "Carol"}];
const uniqueUsers = users1.except(users2, (a, b) => a.id === b.id);
console.log(uniqueUsers.toArray()); // [{id: 1, name: "Alice"}]
```

### `first`

Retorna o primeiro elemento de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Obter o primeiro elemento
const numbers = new Collection([1, 2, 3, 4, 5]);
const first = numbers.first();
console.log(first); // 1

// Exemplo 2: Obter o primeiro elemento que satisfaz uma condição
const firstEven = numbers.first(x => x % 2 === 0);
console.log(firstEven); // 2
```

### `firstOrDefault`

Retorna o primeiro elemento da sequência ou um valor padrão se a sequência estiver vazia.

**Exemplos:**

```typescript
// Exemplo 1: Obter o primeiro elemento de uma coleção não vazia
const numbers = new Collection([1, 2, 3, 4, 5]);
const first = numbers.firstOrDefault(null);
console.log(first); // 1

// Exemplo 2: Obter o primeiro elemento que satisfaz uma condição ou valor padrão
const firstBigNumber = numbers.firstOrDefault(null, x => x > 10);
console.log(firstBigNumber); // null (nenhum número é maior que 10)
```

### `forEach`

Executa uma função para cada elemento na sequência.

**Exemplos:**

```typescript
// Exemplo 1: Imprimir cada elemento
const numbers = new Collection([1, 2, 3]);
numbers.forEach(num => console.log(`Número: ${num}`));
// Saída:
// Número: 1
// Número: 2
// Número: 3

// Exemplo 2: Acumular em uma variável externa
let sum = 0;
numbers.forEach(num => sum += num);
console.log(`Soma: ${sum}`); // Soma: 6
```

### `groupBy`

Agrupa elementos de acordo com uma chave especificada.

**Exemplos:**

```typescript
// Exemplo 1: Agrupar números por paridade
const numbers = new Collection([1, 2, 3, 4, 5, 6]);
const grouped = numbers.groupBy(n => n % 2 === 0 ? "pares" : "ímpares");
console.log(grouped.toArray());
// [
//   { key: "ímpares", values: [1, 3, 5] },
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

Correlaciona elementos de duas sequências com base na igualdade de chaves e agrupa os resultados.

**Exemplos:**

```typescript
// Exemplo 1: Juntar departamentos com seus funcionários
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
  { deptId: 4, name: "Eve" }  // departamento não existente
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

Produz a interseção de conjunto de duas sequências.

**Exemplos:**

```typescript
// Exemplo 1: Encontrar números comuns entre duas coleções
const first = new Collection([1, 2, 3, 4, 5]);
const second = [3, 4, 5, 6, 7];
const common = first.intersect(second);
console.log(common.toArray()); // [3, 4, 5]

// Exemplo 2: Interseção de objetos com comparador personalizado
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

Correlaciona elementos de duas sequências com base em chaves correspondentes.

**Exemplos:**

```typescript
// Exemplo 1: Juntar produtos com categorias
const categories = new Collection([
  { id: 1, name: "Eletrônicos" },
  { id: 2, name: "Livros" }
]);

const products = [
  { categoryId: 1, name: "Laptop" },
  { categoryId: 1, name: "Smartphone" },
  { categoryId: 2, name: "TypeScript Guia Prático" },
  { categoryId: 3, name: "Tênis" } // Categoria que não existe
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
//   { product: "Laptop", category: "Eletrônicos" },
//   { product: "Smartphone", category: "Eletrônicos" },
//   { product: "TypeScript Guia Prático", category: "Livros" }
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

Retorna o último elemento de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Obter o último elemento
const numbers = new Collection([1, 2, 3, 4, 5]);
const last = numbers.last();
console.log(last); // 5

// Exemplo 2: Obter o último elemento que satisfaz uma condição
const lastEven = numbers.last(x => x % 2 === 0);
console.log(lastEven); // 4
```

### `lastOrDefault`

Retorna o último elemento da sequência ou um valor padrão se a sequência estiver vazia.

**Exemplos:**

```typescript
// Exemplo 1: Obter o último elemento de uma coleção não vazia
const numbers = new Collection([1, 2, 3, 4, 5]);
const last = numbers.lastOrDefault(0);
console.log(last); // 5

// Exemplo 2: Obter o último elemento que satisfaz uma condição ou valor padrão
const lastBigNumber = numbers.lastOrDefault(0, x => x > 10);
console.log(lastBigNumber); // 0 (nenhum número é maior que 10)
```

### `max`

Retorna o valor máximo em uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Encontrar o maior número
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

Retorna o valor mínimo em uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Encontrar o menor número
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

Ordena os elementos de uma sequência em ordem crescente.

**Exemplos:**

```typescript
// Exemplo 1: Ordenar números
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

Ordena os elementos de uma sequência em ordem decrescente.

**Exemplos:**

```typescript
// Exemplo 1: Ordenar números em ordem decrescente
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

Adiciona um valor ao início da sequência.

**Exemplos:**

```typescript
// Exemplo 1: Adicionar um número ao início da coleção
const numbers = new Collection([2, 3, 4]);
const withOne = numbers.prepend(1);
console.log(withOne.toArray()); // [1, 2, 3, 4]

// Exemplo 2: Adicionar um objeto ao início de uma coleção
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

Inverte a ordem dos elementos em uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Inverter uma coleção de números
const numbers = new Collection([1, 2, 3, 4, 5]);
const reversed = numbers.reverse();
console.log(reversed.toArray()); // [5, 4, 3, 2, 1]

// Exemplo 2: Inverter uma coleção de strings
const words = new Collection(["primeiro", "segundo", "terceiro"]);
const reversedWords = words.reverse();
console.log(reversedWords.toArray()); // ["terceiro", "segundo", "primeiro"]
```

### `select`

Projeta cada elemento de uma sequência em uma nova forma.

**Exemplos:**

```typescript
// Exemplo 1: Dobrar cada número
const numbers = new Collection([1, 2, 3, 4]);
const doubled = numbers.select(x => x * 2);
console.log(doubled.toArray()); // [2, 4, 6, 8]

// Exemplo 2: Extrair propriedades específicas de objetos
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

Projeta cada elemento de uma sequência em uma nova sequência e aplana o resultado.

**Exemplos:**

```typescript
// Exemplo 1: Converter array de arrays em um único array plano
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

Determina se duas sequências são iguais comparando seus elementos.

**Exemplos:**

```typescript
// Exemplo 1: Comparar duas coleções de números
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

Retorna o único elemento de uma sequência que satisfaz uma condição.

**Exemplos:**

```typescript
// Exemplo 1: Obter o único elemento que satisfaz uma condição
const numbers = new Collection([1, 2, 3, 4, 5]);
try {
  const onlyThree = numbers.single(x => x === 3);
  console.log(onlyThree); // 3
} catch (e) {
  console.log("Erro: múltiplos elementos ou nenhum elemento encontrado");
}

// Exemplo 2: Tentar obter um elemento onde vários satisfazem a condição
try {
  const evenNumber = numbers.single(x => x % 2 === 0);
} catch (e) {
  console.log("Erro: múltiplos elementos encontrados"); // Será exibido, pois existem dois números pares
}
```

### `singleOrDefault`

Retorna o único elemento de uma sequência que satisfaz uma condição ou um valor padrão se nenhum existir.

**Exemplos:**

```typescript
// Exemplo 1: Obter o único elemento que satisfaz uma condição
const numbers = new Collection([1, 2, 3, 4, 5]);
const onlyThree = numbers.singleOrDefault(0, x => x === 3);
console.log(onlyThree); // 3

// Exemplo 2: Obter valor padrão quando nenhum elemento satisfaz a condição
const bigNumber = numbers.singleOrDefault(0, x => x > 10);
console.log(bigNumber); // 0

// Exemplo 3: Lançar exceção quando múltiplos elementos satisfazem a condição
try {
  const evenNumber = numbers.singleOrDefault(0, x => x % 2 === 0);
} catch (e) {
  console.log("Erro: múltiplos elementos encontrados"); // Será exibido
}
```

### `skip`

Ignora um número especificado de elementos no início de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Pular os dois primeiros elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const skipped = numbers.skip(2);
console.log(skipped.toArray()); // [3, 4, 5]

// Exemplo 2: Pular mais elementos do que existem na coleção
const tooManySkipped = numbers.skip(10);
console.log(tooManySkipped.toArray()); // [] (coleção vazia)
```

### `skipLast`

Ignora um número especificado de elementos no final de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Pular os dois últimos elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const withoutLast = numbers.skipLast(2);
console.log(withoutLast.toArray()); // [1, 2, 3]

// Exemplo 2: Pular mais elementos do que existem na coleção
const letters = new Collection(["a", "b", "c"]);
const tooManySkipped = letters.skipLast(5);
console.log(tooManySkipped.toArray()); // [] (coleção vazia)
```

### `skipWhile`

Ignora elementos em uma sequência enquanto uma condição for verdadeira.

**Exemplos:**

```typescript
// Exemplo 1: Pular números menores que 3
const numbers = new Collection([1, 2, 3, 4, 5, 1, 2]);
const skipped = numbers.skipWhile(x => x < 3);
console.log(skipped.toArray()); // [3, 4, 5, 1, 2]

// Exemplo 2: Pular com índice na condição
const data = new Collection([2, 4, 6, 8, 1, 3]);
const result = data.skipWhile((x, index) => x > index * 2);
console.log(result.toArray()); // [1, 3]
```

### `sum`

Calcula a soma dos valores em uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Soma de números
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

Retorna um número especificado de elementos do início de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Pegar os três primeiros elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const firstThree = numbers.take(3);
console.log(firstThree.toArray()); // [1, 2, 3]

// Exemplo 2: Tentar pegar mais elementos do que existem
const moreNumbers = numbers.take(10);
console.log(moreNumbers.toArray()); // [1, 2, 3, 4, 5] (todos os elementos disponíveis)
```

### `takeLast`

Retorna um número especificado de elementos do final de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Pegar os dois últimos elementos
const numbers = new Collection([1, 2, 3, 4, 5]);
const lastTwo = numbers.takeLast(2);
console.log(lastTwo.toArray()); // [4, 5]

// Exemplo 2: Tentar pegar mais elementos do que existem
const letters = new Collection(["a", "b", "c"]);
const allLetters = letters.takeLast(5);
console.log(allLetters.toArray()); // ["a", "b", "c"] (todos os elementos disponíveis)
```

### `takeWhile`

Retorna elementos de uma sequência enquanto uma condição for verdadeira.

**Exemplos:**

```typescript
// Exemplo 1: Pegar números menores que 4
const numbers = new Collection([1, 2, 3, 4, 1, 2]);
const lessThanFour = numbers.takeWhile(x => x < 4);
console.log(lessThanFour.toArray()); // [1, 2, 3]

// Exemplo 2: Pegar com índice na condição
const data = new Collection([2, 4, 6, 8, 1, 3]);
const result = data.takeWhile((x, index) => x > index);
console.log(result.toArray()); // [2, 4, 6, 8]
```

### `thenBy`

Realiza uma ordenação secundária dos elementos.

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

// Exemplo 2: Ordenar produtos por categoria e depois por preço
const products = new Collection([
  { name: "Mouse", category: "Periféricos", price: 25 },
  { name: "Teclado", category: "Periféricos", price: 50 },
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
//   { name: "Mouse", category: "Periféricos", price: 25 },
//   { name: "Teclado", category: "Periféricos", price: 50 }
// ]
```

### `thenByDescending`

Realiza uma ordenação secundária decrescente dos elementos.

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

// Exemplo 2: Ordenar produtos por categoria e depois por preço descendente
const products = new Collection([
  { name: "Mouse", category: "Periféricos", price: 25 },
  { name: "Teclado", category: "Periféricos", price: 50 },
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
//   { name: "Teclado", category: "Periféricos", price: 50 },
//   { name: "Mouse", category: "Periféricos", price: 25 }
// ]
```

### `toArray`

Converte uma sequência em um array.

**Exemplos:**

```typescript
// Exemplo 1: Converter uma coleção filtrada em array
const numbers = new Collection([1, 2, 3, 4, 5]);
const evenArray = numbers.where(x => x % 2 === 0).toArray();
console.log(evenArray); // [2, 4]

// Exemplo 2: Converter uma coleção mapeada em array
const doubled = numbers.select(x => x * 2).toArray();
console.log(doubled); // [2, 4, 6, 8, 10]
```

### `toDictionary`

Cria um dicionário a partir de uma sequência de acordo com uma função de chave especificada.

**Exemplos:**

```typescript
// Exemplo 1: Criar dicionário de usuários por ID
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

// Exemplo 2: Criar dicionário de palavras por comprimento
const words = new Collection(["um", "dois", "três", "quatro"]);
const byLength = words.toDictionary(
  word => word.length,
  word => word
);

console.log(byLength);
// {
//   2: "um",
//   4: "dois",
//   5: "três",
//   6: "quatro"
// }
```

### `toList`

Cria uma lista a partir de uma sequência.

**Exemplos:**

```typescript
// Exemplo 1: Converter uma coleção em lista
const numbers = new Collection([1, 2, 3, 4, 5]);
const list = numbers.toList();
console.log(list); // [1, 2, 3, 4, 5]

// Exemplo 2: Converter uma coleção filtrada em lista
const evenList = numbers.where(x => x % 2 === 0).toList();
console.log(evenList); // [2, 4]
```

### `toLookup`

Cria um lookup (dicionário de arrays) a partir de uma sequência de acordo com uma função de chave especificada.

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

Produz a união de conjunto de duas sequências.

**Exemplos:**

```typescript
// Exemplo 1: União de duas coleções de números
const first = new Collection([1, 2, 3]);
const second = [3, 4, 5];
const union = first.union(second);
console.log(union.toArray()); // [1, 2, 3, 4, 5]

// Exemplo 2: União de coleções de objetos com comparador personalizado
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

Filtra uma sequência com base em um predicado.

**Exemplos:**

```typescript
// Exemplo 1: Filtrar números pares
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

Aplica uma função a elementos correspondentes de duas sequências, produzindo uma sequência de resultados.

**Exemplos:**

```typescript
// Exemplo 1: Combinar duas coleções de números
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

## Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um Pull Request.

## Licença

MIT
