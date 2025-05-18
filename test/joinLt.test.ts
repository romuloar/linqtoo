import { addJoinLt } from '../src/methods/joinLt';

describe('Array.prototype.joinLt', () => {
  beforeAll(() => {
    addJoinLt();
  });

  test('performs inner join correctly', () => {
    const outer = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Joe' }
    ];

    const inner = [
      { userId: 1, order: 'Book' },
      { userId: 2, order: 'Pen' },
      { userId: 4, order: 'Notebook' }
    ];

    const result = outer.joinLt(
      inner,
      o => o.id,
      i => i.userId,
      (o, i) => ({ userName: o.name, order: i.order })
    );

    expect(result).toEqual([
      { userName: 'John', order: 'Book' },
      { userName: 'Jane', order: 'Pen' }
    ]);
  });

  test('returns empty array if no matches', () => {
    const outer = [{ id: 1, name: 'John' }];
    const inner = [{ userId: 2, order: 'Pen' }];

    const result = outer.joinLt(
      inner,
      o => o.id,
      i => i.userId,
      (o, i) => ({ userName: o.name, order: i.order })
    );

    expect(result).toEqual([]);
  });

  test('handles empty outer array', () => {
    const outer: { id: number; name: string }[] = [];
    const inner = [{ userId: 1, order: 'Book' }];

    const result = outer.joinLt(
      inner,
      o => o.id,
      i => i.userId,
      (o, i) => ({ userName: o.name, order: i.order })
    );

    expect(result).toEqual([]);
  });

  test('handles empty inner array', () => {
    const outer = [{ id: 1, name: 'John' }];
    const inner: { userId: number; order: string }[] = [];

    const result = outer.joinLt(
      inner,
      o => o.id,
      i => i.userId,
      (o, i) => ({ userName: o.name, order: i.order })
    );

    expect(result).toEqual([]);
  });
});