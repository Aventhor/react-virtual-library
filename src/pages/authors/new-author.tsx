import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Author } from "../../interfaces/author";
import service from "../../helpers/service";
import AuthorForm from "../../components/authors/author-form";

const NewAuthorPage = ({ history }: RouteComponentProps) => {
    const [author, setAuthor] = useState<Author>({
        last_name: "",
        first_name: "",
    } as Author);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (!form.checkValidity()) {
            return;
        }

        service.post("authors", author);

        history.goBack();
    };

    const goBack = () => {
        history.goBack();
    };

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setAuthor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        goBack();
    };

    return (
        <div className="page">
            <h2>Добавление автора</h2>
            <div className="form-container">
                <AuthorForm
                    author={author}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelClick}
                    onChangeInput={handleChangeInput}
                />
            </div>
        </div>
    );
};

export default NewAuthorPage;
