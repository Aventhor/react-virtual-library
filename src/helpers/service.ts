import { Book } from "../interfaces/book";

const setItems = (key: string, items: any[]) =>
    localStorage.setItem(key, JSON.stringify(items));

const service = {
    getAll: (key: string) => JSON.parse(localStorage.getItem(key) || "[]"),
    getOne: (key: string, id: string | number) => {
        const items = service.getAll(key);
        return items.find((el) => el.id === +id);
    },
    post: (key: string, obj: any) => {
        const items = service.getAll(key);
        obj.id = items.length === 0 ? 1 : items[items.length - 1].id + 1;
        setItems(key, [...items, obj]);
        return obj;
    },
    put: (key: string, id: string | number, obj: any) => {
        const items = service.getAll(key);
        items.forEach((item, i) => {
            if (item.id === +id) {
                obj.id = items[i].id;
                items[i] = obj;
            }
        });
        setItems(key, items);
        return obj;
    },
    delete: (key: string, id: string | number) => {
        const items = service.getAll(key);
        const item = service.getOne(key, id);

        setItems(
            key,
            items.filter((el) => el.id !== id)
        );

        return item;
    },
};

export const checkAuthorHasBook = (authorId: number): boolean => {
    const books = service.getAll("books");
    let hasBook = false;

    books.forEach((book) => {
        if (book.author_id === authorId) {
            hasBook = true;
            return;
        }
    });
    return hasBook;
};

export const findAuthorBook = (authorId: number): Book | null => {
    const books = service.getAll("books");
    let authorBook = null;

    books.forEach((book) => {
        if (book.author_id === authorId) {
            authorBook = book;
            return;
        }
    });
    return authorBook;
};

export default service;
