import React, { useEffect, useState } from "react";
import { Author } from "../../interfaces/author";
import service from "../../helpers/service";
import { useHistory } from "react-router-dom";
import AuthorForm from "../../components/authors/author-form";
import LoadingIndicator from "../../components/common/loading-indicator";
import ShowError from "../../components/common/show-error";

interface Props {
    authorId: number | string;
}

const EditAuthorPage = ({ authorId }: Props) => {
    const history = useHistory();

    const [state, setState] = useState({
        author: {} as Author,
        isLoading: true,
        hasError: false,
    });

    useEffect(() => {
        const loadData = () => {
            const author = service.getOne("authors", authorId);
            if (!author) {
                setState((prevState) => ({
                    ...prevState,
                    hasError: true,
                    isLoading: false,
                }));
                return;
            }
            setState((prevState) => ({
                ...prevState,
                author,
                isLoading: false,
            }));
        };

        loadData();
    }, [authorId]);

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        const author = state.author;
        author[name] = value;

        setState((prevState) => ({
            ...prevState,
            author,
        }));
    };

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

        service.put("authors", authorId, state.author);

        goBack();
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
            <h2>Редактирование автора</h2>
            <div className="form-container">
                <AuthorForm
                    author={state.author}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelClick}
                    onChangeInput={handleChangeInput}
                />
            </div>
        </div>
    );
};

export default EditAuthorPage;
