import '../../src/index';


describe('unionLinq', () => {
    it('should union two number arrays', () => {
        expect([1, 2, 3].unionLinq([3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should union two string arrays without duplicates', () => {
        expect(['Romulo', 'Bia'].unionLinq(['Bia', 'Felipe']))
            .toEqual(['Romulo', 'Bia', 'Felipe']);
    });

    it('should union object arrays by reference (without comparer)', () => {
        const a = [{ id: 1 }];
        const b = [{ id: 1 }];
        expect(a.unionLinq(b)).toHaveLength(2); // Diferentes refer�ncias
    });

    it('should union object arrays using a custom comparer', () => {
        const a = [{ id: 1 }];
        const b = [{ id: 1 }, { id: 2 }];
        const result = a.unionLinq(b, (x, y) => x.id === y.id);
        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should union with an empty array', () => {
        expect(([] as number[]).unionLinq([1, 2, 3])).toEqual([1, 2, 3]);
    });
});
