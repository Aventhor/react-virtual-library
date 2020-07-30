import React, { useEffect, useState, useCallback } from "react";
import { Author } from "../../interfaces/author";
import service from "../../helpers/service";
import { useHistory } from "react-router-dom";
import LoadingIndicator from "../../components/common/loading-indicator";
import ShowError from "../../components/common/show-error";

interface Props {
    authorId: number | string;
}

const ViewAuthorPage = ({ authorId }: Props) => {
    const history = useHistory();

    const [state, setState] = useState({
        author: {} as Author,
        isLoading: true,
        hasError: false,
    });

    const getAuthor = useCallback((): Author => {
        return service.getOne("authors", authorId);
    }, [authorId]);

    useEffect(() => {
        const author = getAuthor();
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
    }, [getAuthor]);

    const goBack = () => {
        history.push("/authors");
    };

    if (state.isLoading) return <LoadingIndicator />;

    if (state.hasError) return <ShowError />;

    return (
        <div className="page">
            <h2>Просмотр автора</h2>

            <h4>
                <b>Фамилия:</b> {state.author.last_name}
            </h4>
            <h4>
                <b>Имя:</b> {state.author.first_name}
            </h4>

            <button onClick={goBack}>Назад</button>
        </div>
    );
};

export default ViewAuthorPage;
