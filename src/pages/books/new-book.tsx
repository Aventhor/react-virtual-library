import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Book } from "../../interfaces/book";
import service, { checkAuthorHasBook } from "../../helpers/service";
import { Author } from "../../interfaces/author";
import BookForm from "../../components/books/book-form";

const NewBookPage = ({ history }: RouteComponentProps) => {
    const [authors, setAuthors] = useState<Author[]>([]);

    const [book, setBook] = useState<Book>({
        title: "",
        author_id: 0,
        year: 0,
        created_at: new Date(),
    } as Book);
    const [errorMessage, setErrorMessage] = useState("");

    const loadData = () => {
        const data = service.getAll("authors");
        setAuthors(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const goBack = () => {
        history.goBack();
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (!form.checkValidity()) {
            return;
        }

        if (checkAuthorHasBook(book.author_id)) {
            setErrorMessage("У данного автора уже есть книга");
            return;
        }

        service.post("books", book);

        goBack();
    };

    const handleChangeInput = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;

        setBook((prevState) => ({
            ...prevState,
            [name]: name === "title" ? value : +value,
        }));
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        goBack();
    };

    return (
        <div className="page">
            <h2>Добавление книги</h2>
            <div className="form-container">
                <BookForm
                    book={book}
                    errorMessage={errorMessage}
                    authors={authors}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelClick}
                    onChangeInput={handleChangeInput}
                />
            </div>
        </div>
    );
};

export default NewBookPage;
