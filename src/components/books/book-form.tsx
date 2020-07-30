import React from "react";
import { Book } from "../../interfaces/book";
import { Author } from "../../interfaces/author";

interface Props {
    book: Book;
    authors: Author[];
    errorMessage: string;
    onSubmit: (e) => void;
    onChangeInput: (e) => void;
    onCancel: (e) => void;
}

export default function BookForm({
    book,
    authors,
    errorMessage,
    onSubmit,
    onChangeInput,
    onCancel,
}: Props) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Название</label>
                <input
                    required
                    type="text"
                    name="title"
                    placeholder="Введите название"
                    onChange={onChangeInput}
                    value={book.title}
                />
                <span className="error">Поле не может быть пустым</span>
            </div>
            <div className="form-group">
                <label>Автор</label>
                <select
                    name="author_id"
                    required
                    onChange={onChangeInput}
                    value={book.author_id || ""}
                >
                    <option value="">Выберите автора</option>
                    {authors.map((author) => {
                        return (
                            <option key={author.id} value={author.id}>
                                {author.last_name} {author.first_name}
                            </option>
                        );
                    })}
                </select>
                {!authors.length && (
                    <span className="feedback feedback-type--invalid">
                        Нет подходящих авторов
                    </span>
                )}
            </div>
            <div className="form-group">
                <label>Первая публикация</label>
                <input
                    required
                    type="number"
                    pattern="[0-9]*"
                    min={1000}
                    max={9999}
                    name="year"
                    placeholder="Год публикации"
                    onChange={onChangeInput}
                    value={book.year || ""}
                />
                <span className="error">Год указан неверно</span>
            </div>
            <span className="feedback feedback-type--invalid">
                {errorMessage}
            </span>
            <div className="form-actions">
                <button onClick={onCancel}>Отмена</button>
                <button className="btn-color--primary">Добавить</button>
            </div>
        </form>
    );
}
