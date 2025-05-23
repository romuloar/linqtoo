import '../../src/index';

describe('joinLinq', () => {
    const users = [
        { id: 1, name: 'Romulo' },
        { id: 2, name: 'Bia' },
        { id: 3, name: 'Felipe' }
    ];

    const orders = [
        { userId: 1, product: 'Laptop' },
        { userId: 1, product: 'Mouse' },
        { userId: 2, product: 'Keyboard' },
        { userId: 4, product: 'Monitor' }
    ];

    it('should join matching elements', () => {
        const result = users.joinLinq(
            orders,
            user => user.id,
            order => order.userId,
            (user, order) => ({
                userName: user.name,
                product: order.product
            })
        );

        expect(result).toEqual([
            { userName: 'Romulo', product: 'Laptop' },
            { userName: 'Romulo', product: 'Mouse' },
            { userName: 'Bia', product: 'Keyboard' }
        ]);
    });

    it('should return an empty array if no matches', () => {
        const result = users.joinLinq(
            orders.filter(o => o.userId === 999),
            user => user.id,
            order => order.userId,
            (user, order) => ({
                userName: user.name,
                product: order.product
            })
        );

        expect(result).toEqual([]);
    });

    it('should handle multiple matches per user', () => {
        const result = users
            .filter(u => u.id === 1)
            .joinLinq(
                orders,
                user => user.id,
                order => order.userId,
                (user, order) => ({
                    userName: user.name,
                    product: order.product
                })
            );

        expect(result).toEqual([
            { userName: 'Romulo', product: 'Laptop' },
            { userName: 'Romulo', product: 'Mouse' }
        ]);
    });

    it('should work with different types of keys', () => {
        const books = [
            { code: 'A1', title: 'Book A' },
            { code: 'B2', title: 'Book B' }
        ];

        const reviews = [
            { bookCode: 'A1', stars: 5 },
            { bookCode: 'A1', stars: 4 }
        ];

        const result = books.joinLinq(
            reviews,
            b => b.code,
            r => r.bookCode,
            (book, review) => ({
                title: book.title,
                stars: review.stars
            })
        );

        expect(result).toEqual([
            { title: 'Book A', stars: 5 },
            { title: 'Book A', stars: 4 }
        ]);
    });
});