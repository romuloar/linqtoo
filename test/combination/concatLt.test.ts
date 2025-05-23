import '../../src/index';

describe('concatLinq', () => {

    describe('Basic concatenation', () => {
        it('should concatenate two arrays of numbers', () => {
            const first = [1, 2, 3];
            const second = [4, 5, 6];
            const result = first.concatLinq(second);

            expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it('should concatenate two arrays of strings', () => {
            const first = ['a', 'b', 'c'];
            const second = ['d', 'e', 'f'];
            const result = first.concatLinq(second);

            expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });

        it('should concatenate two arrays of objects', () => {
            const first = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
            const second = [{ id: 3, name: 'Bob' }, { id: 4, name: 'Alice' }];
            const result = first.concatLinq(second);

            expect(result).toEqual([
                { id: 1, name: 'John' },
                { id: 2, name: 'Jane' },
                { id: 3, name: 'Bob' },
                { id: 4, name: 'Alice' }
            ]);
        });
    });

    describe('Edge cases', () => {
        it('should concatenate with empty array (first empty)', () => {
            const first: number[] = [];
            const second = [1, 2, 3];
            const result = first.concatLinq(second);

            expect(result).toEqual([1, 2, 3]);
        });

        it('should concatenate with empty array (second empty)', () => {
            const first = [1, 2, 3];
            const second: number[] = [];
            const result = first.concatLinq(second);

            expect(result).toEqual([1, 2, 3]);
        });

        it('should concatenate two empty arrays', () => {
            const first: number[] = [];
            const second: number[] = [];
            const result = first.concatLinq(second);

            expect(result).toEqual([]);
        });

        it('should handle arrays with duplicate elements', () => {
            const first = [1, 2, 2, 3];
            const second = [2, 3, 4, 4];
            const result = first.concatLinq(second);

            expect(result).toEqual([1, 2, 2, 3, 2, 3, 4, 4]);
        });

    });

    describe('Immutability', () => {
        it('should not modify the original arrays', () => {
            const first = [1, 2, 3];
            const second = [4, 5, 6];
            const originalFirst = [...first];
            const originalSecond = [...second];

            const result = first.concatLinq(second);

            expect(first).toEqual(originalFirst);
            expect(second).toEqual(originalSecond);
            expect(result).not.toBe(first);
            expect(result).not.toBe(second);
        });

        it('should create a new array instance', () => {
            const first = [1, 2, 3];
            const second = [4, 5, 6];
            const result = first.concatLinq(second);

            expect(result).not.toBe(first);
            expect(result).not.toBe(second);
        });
    });

    describe('Type safety', () => {
        it('should work with complex types', () => {
            interface User {
                id: number;
                name: string;
                active: boolean;
            }

            const users1: User[] = [
                { id: 1, name: 'John', active: true },
                { id: 2, name: 'Jane', active: false }
            ];

            const users2: User[] = [
                { id: 3, name: 'Bob', active: true },
                { id: 4, name: 'Alice', active: false }
            ];

            const result = users1.concatLinq(users2);

            expect(result).toHaveLength(4);
            expect(result[0]).toEqual({ id: 1, name: 'John', active: true });
            expect(result[3]).toEqual({ id: 4, name: 'Alice', active: false });
        });
    });

    describe('Error handling', () => {
        it('should throw error when parameter is not an array', () => {
            const first = [1, 2, 3];

            expect(() => first.concatLinq(null as any)).toThrow('Parameter must be an array');
            expect(() => first.concatLinq(undefined as any)).toThrow('Parameter must be an array');
            expect(() => first.concatLinq('not an array' as any)).toThrow('Parameter must be an array');
            expect(() => first.concatLinq(123 as any)).toThrow('Parameter must be an array');
            expect(() => first.concatLinq({} as any)).toThrow('Parameter must be an array');
        });
    });

    describe('Performance considerations', () => {
        it('should handle large arrays efficiently', () => {
            const first = Array.from({ length: 1000 }, (_, i) => i);
            const second = Array.from({ length: 1000 }, (_, i) => i + 1000);

            const startTime = performance.now();
            const result = first.concatLinq(second);
            const endTime = performance.now();

            expect(result).toHaveLength(2000);
            expect(result[0]).toBe(0);
            expect(result[999]).toBe(999);
            expect(result[1000]).toBe(1000);
            expect(result[1999]).toBe(1999);

            // Should complete reasonably quickly
            expect(endTime - startTime).toBeLessThan(100);
        });
    });

    describe('Chaining with other LINQ methods', () => {
        it('should work in method chaining', () => {
            const first = [1, 2, 3];
            const second = [4, 5, 6];
            const third = [7, 8, 9];

            // Assuming other LINQ methods exist
            const result = first
                .concatLinq(second)
                .concatLinq(third);

            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
    });
});