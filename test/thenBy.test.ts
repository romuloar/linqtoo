import { addThenBy } from '../src/methods/thenBy';

beforeAll(() => {
  addThenBy();
});

describe('Array.prototype.thenBy (placeholder)', () => {
  test('method is added to Array prototype', () => {
    expect(typeof Array.prototype.thenBy).toBe('function');
  });

  test('returns a copy of the original array', () => {
    const arr = [3, 1, 2];
    const result = arr.thenBy(x => x);
    expect(result).not.toBe(arr); // não é a mesma referência
    expect(result).toEqual(arr); // conteúdo igual
  });

  test('does not modify the original array', () => {
    const arr = [5, 4, 3];
    const copy = [...arr];
    arr.thenBy(x => x);
    expect(arr).toEqual(copy); // array original inalterado
  });

  test('works with array of objects', () => {
    const arr = [{id: 2}, {id: 1}];
    const result = arr.thenBy(x => x.id);
    expect(result).not.toBe(arr);
    expect(result).toEqual(arr);
  });
});