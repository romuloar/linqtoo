import { addDistinctLinq } from '../../src/methods/filtering/distinctLinq';

beforeAll(() => {
    addDistinctLinq();
});

describe('distinct', () => {
    it('should remove duplicate primitive values', () => {
        const arr = [1, 2, 2, 3, 1];
        expect(arr.distinctLinq()).toEqual([1, 2, 3]);
    });

    it('should return empty array if input is empty', () => {
        const arr: number[] = [];
        expect(arr.distinctLinq()).toEqual([]);
    });

    it('should work with strings', () => {
        const arr = ['a', 'b', 'a', 'c'];
        expect(arr.distinctLinq()).toEqual(['a', 'b', 'c']);
    });

    it('should work with complex objects using a selector', () => {
        const arr = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice' }
        ];
        expect(arr.distinctLinq(x => x.id)).toEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ]);
    });

    it('should treat undefined and null as distinct', () => {
        const arr = [undefined, null, undefined, null];
        expect(arr.distinctLinq()).toEqual([undefined, null]);
    });
});
