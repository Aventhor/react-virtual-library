import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";

import AuthorsTable from "../components/authors/authors-table";
import { Author } from "../interfaces/author";
import service, { findAuthorBook } from "../helpers/service";

const AuthorsPage = ({ history, location }: RouteComponentProps) => {
    const [state, setState] = useState({
        authors: [] as Author[],
        isLoading: true,
    });

    const getAuthors = useCallback((): Author[] => {
        return service.getAll("authors");
    }, []);

    const loadData = useCallback(() => {
        const authors = getAuthors();
        setState({ authors, isLoading: false });
    }, [getAuthors]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleAddAuthor = () => {
        history.push(`${location.pathname}/new`);
    };

    const handleDeleteAuthor = (author: Author) => {
        service.delete("authors", author.id);
        const book = findAuthorBook(author.id);
        if (book) service.delete("books", book.id);
        loadData();
    };

    if (state.isLoading) return <></>;

    return (
        <div className="page">
            <div className="page-header-container">
                <h2>Авторы</h2>
                <button
                    onClick={handleAddAuthor}
                    className="btn-color--primary"
                >
                    Добавить автора
                </button>
            </div>
            <AuthorsTable
                authors={state.authors}
                location={location.pathname}
                onDeleteAuthor={handleDeleteAuthor}
            />
        </div>
    );
};

export default AuthorsPage;
