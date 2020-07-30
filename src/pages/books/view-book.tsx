import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Book } from "../../interfaces/book";
import service from "../../helpers/service";
import { Author } from "../../interfaces/author";
import LoadingIndicator from "../../components/common/loading-indicator";
import ShowError from "../../components/common/show-error";

interface Props {
    bookId: number | string;
}

const ViewBookPage = ({ bookId }: Props) => {
    const history = useHistory();

    const [state, setState] = useState({
        book: {} as Book,
        author: {} as Author,
        isLoading: true,
        hasError: false,
    });

    const getBook = useCallback((): Book => {
        return service.getOne("books", bookId);
    }, [bookId]);

    const getAuthor = useCallback((authorId: number): Author => {
        return service.getOne("authors", authorId);
    }, []);

    useEffect(() => {
        const loadData = () => {
            const book = getBook();
            if (!book) {
                setState((prevState) => ({
                    ...prevState,
                    hasError: true,
                    isLoading: false,
                }));
                return;
            }
            const author = getAuthor(book.author_id);

            setState((prevState) => ({
                ...prevState,
                book,
                author,
                isLoading: false,
            }));
        };

        loadData();
    }, [getBook, getAuthor]);

    const goBack = () => {
        history.push("/books");
    };

    if (state.isLoading) return <LoadingIndicator />;

    if (state.hasError) return <ShowError />;

    return (
        <div className="page">
            <h2>Просмотр книги</h2>

            <h4>
                <b>Название:</b> {state.book.title}
            </h4>
            <h4>
                <b>Автор:</b> {state.author.last_name} {state.author.first_name}
            </h4>
            <h4>
                <b>Первая публикация:</b> {state.book.year}
            </h4>

            <button onClick={goBack}>Назад</button>
        </div>
    );
};

export default ViewBookPage;
