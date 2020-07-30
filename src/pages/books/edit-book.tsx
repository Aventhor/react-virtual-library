import React, { useEffect, useCallback, useState, useRef } from "react";
import service, { checkAuthorHasBook } from "../../helpers/service";
import { Book } from "../../interfaces/book";
import { Author } from "../../interfaces/author";
import { useHistory } from "react-router-dom";
import BookForm from "../../components/books/book-form";
import LoadingIndicator from "../../components/common/loading-indicator";
import ShowError from "../../components/common/show-error";

interface Props {
    bookId: number | string;
}

const EditBookPage = ({ bookId }: Props) => {
    const history = useHistory();

    const [state, setState] = useState({
        book: {} as Book,
        authors: [] as Author[],
        isLoading: true,
        hasError: false,
        errorMessage: "",
    });

    const initialAuthorId = useRef(0);

    const getBook = useCallback((): Book => {
        return service.getOne("books", bookId);
    }, [bookId]);

    const getAuthors = useCallback((): Author[] => {
        return service.getAll("authors");
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
            const authors = getAuthors();

            setState((prevState) => ({
                ...prevState,
                book,
                authors,
                isLoading: false,
            }));
            initialAuthorId.current = book.author_id;
        };

        loadData();
    }, [getBook, getAuthors]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (!form.checkValidity()) {
            return;
        }

        if (
            checkAuthorHasBook(state.book.author_id) &&
            initialAuthorId.current !== state.book.author_id
        ) {
            setState((prevState) => ({
                ...prevState,
                errorMessage: "У данного автора уже есть книга",
            }));
            return;
        }

        service.put("books", bookId, state.book);

        goBack();
    };

    const handleChangeInput = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;

        const newBook = state.book;
        newBook[name] = name === "title" ? value : +value;

        setState((prevState) => ({
            ...prevState,
            book: newBook,
        }));
    };

    const goBack = () => {
        history.push("/books");
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        goBack();
    };

    if (state.isLoading) return <LoadingIndicator />;

    if (state.hasError) return <ShowError />;

    return (
        <div className="page">
            <h2>Редактирование книги</h2>
            <div className="form-container">
                <BookForm
                    book={state.book}
                    errorMessage={state.errorMessage}
                    authors={state.authors}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelClick}
                    onChangeInput={handleChangeInput}
                />
            </div>
        </div>
    );
};

export default EditBookPage;
