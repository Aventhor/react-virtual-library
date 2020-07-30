import React, { useState, useEffect, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";

import BooksTable from "../components/books/books-table";
import service from "../helpers/service";
import { Book } from "../interfaces/book";
import { Author } from "../interfaces/author";

const BooksPage = ({ history, location }: RouteComponentProps) => {
    const [state, setState] = useState({
        authors: [] as Author[],
        books: [] as Book[],
        isLoading: true,
    });

    const getBooks = useCallback((): Book[] => {
        return service.getAll("books");
    }, []);

    const getAuthors = useCallback((): Author[] => {
        return service.getAll("authors");
    }, []);

    const loadData = useCallback(() => {
        const books = getBooks();
        const authors = getAuthors();
        setState({ books, authors, isLoading: false });
    }, [getAuthors, getBooks]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleAddBook = () => {
        history.push(`${location.pathname}/new`);
    };

    const handleDeleteBook = (book: Book) => {
        service.delete("books", book.id);
        loadData();
    };

    return (
        <div className="page">
            <div className="page-header-container">
                <h2>Книги</h2>
                <button onClick={handleAddBook} className="btn-color--primary">
                    Добавить книгу
                </button>
            </div>
            <BooksTable
                location={location.pathname}
                books={state.books}
                authors={state.authors}
                onDeleteBook={handleDeleteBook}
            />
        </div>
    );
};

export default BooksPage;
