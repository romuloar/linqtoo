import { addThenByDescending } from '../src/methods/thenByDescending';

beforeAll(() => {
  addThenByDescending();
});

describe('Array.prototype.thenByDescending (placeholder)', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.thenByDescending).toBe('function');
  });

  test('returns a copy of the original array', () => {
    const arr = [10, 20, 30];
    const result = arr.thenByDescending(x => x);
    expect(result).not.toBe(arr); // não é a mesma referência
    expect(result).toEqual(arr); // conteúdo igual
  });

  test('does not modify the original array', () => {
    const arr = [5, 4, 3];
    const copy = [...arr];
    arr.thenByDescending(x => x);
    expect(arr).toEqual(copy); // array original inalterado
  });

  test('works with array of objects', () => {
    const arr = [{ id: 1 }, { id: 2 }];
    const result = arr.thenByDescending(x => x.id);
    expect(result).not.toBe(arr);
    expect(result).toEqual(arr);
  });
});