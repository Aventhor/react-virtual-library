import React from "react";
import { Author } from "../../interfaces/author";

interface Props {
    author: Author;
    onSubmit: (e) => void;
    onChangeInput: (e) => void;
    onCancel: (e) => void;
}

export default function AuthorForm({
    author,
    onSubmit,
    onChangeInput,
    onCancel,
}: Props) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Фамилия</label>
                <input
                    required
                    name="last_name"
                    type="text"
                    pattern="[a-zA-Zа-яА-Я]*"
                    placeholder="Введите фамилию"
                    onChange={onChangeInput}
                    value={author.last_name}
                />
                <span className="error">
                    Фамилия не может содержать числа, пробелы и спец. символы
                </span>
            </div>
            <div className="form-group">
                <label>Имя</label>
                <input
                    required
                    name="first_name"
                    type="text"
                    pattern="[a-zA-Zа-яА-Я]*"
                    placeholder="Введите имя"
                    onChange={onChangeInput}
                    value={author.first_name}
                />
                <span className="error">
                    Имя не может содержать числа, пробелы и спец. символы
                </span>
            </div>
            <div className="form-actions">
                <button onClick={onCancel}>Отмена</button>
                <button className="btn-color--primary">Сохранить</button>
            </div>
        </form>
    );
}
