import { addExceptLinq } from '../../src/methods/set-operations/exceptLinq';

beforeAll(() => {
    addExceptLinq();
});

describe('exceptLinq', () => {
    it('should return elements not in the second array (numbers)', () => {
        expect([1, 2, 3, 4].exceptLinq([2, 4])).toEqual([1, 3]);
    });

    it('should return elements not in the second array (strings)', () => {
        expect(['Romulo', 'Bia', 'Felipe'].exceptLinq(['Bia'])).toEqual(['Romulo', 'Felipe']);
    });

    it('should return all elements if no matches in second array', () => {
        expect(['Romulo', 'Bia', 'Felipe'].exceptLinq(['Zé'])).toEqual(['Romulo', 'Bia', 'Felipe']);
    });

    it('should return empty if all elements match', () => {
        expect(['Romulo', 'Bia', 'Felipe'].exceptLinq(['Romulo', 'Bia', 'Felipe'])).toEqual([]);
    });

    it('should return original array if second array is empty', () => {
        expect(['Romulo', 'Bia', 'Felipe'].exceptLinq([])).toEqual(['Romulo', 'Bia', 'Felipe']);
    });

    it('should throw an error if second argument is not an array', () => {
        expect(() => ['a'].exceptLinq(undefined as any)).toThrow('Parameter must be an array');
    });
});