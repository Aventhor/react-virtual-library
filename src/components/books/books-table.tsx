import React from "react";
import DataTable from "../common/data-table";
import { Book } from "../../interfaces/book";
import { Link } from "react-router-dom";
import { Author } from "../../interfaces/author";

interface Props {
    books: Book[];
    authors: Author[];
    location: string;
    onDeleteBook: (book: Book) => void;
}

interface BookAuthor extends Book {
    author: Author;
}

export default function BooksTable({
    books,
    authors,
    onDeleteBook,
    location,
}: Props) {
    const data = [] as BookAuthor[];

    books.forEach((book) => {
        authors.forEach((author) => {
            if (book.author_id === author.id) {
                const bookAuthor = book as BookAuthor;
                bookAuthor.author = author;
                data.push(bookAuthor);
                return;
            }
        });
    });

    const columns = [
        { field: "title", fieldName: "Название" },
        {
            field: "last_name",
            fieldName: "Фамилия автора",
            render: (rowData) => rowData.author.last_name,
        },
        {
            field: "first_name",
            fieldName: "Имя автора",
            render: (rowData) => rowData.author.first_name,
        },
        { field: "year", fieldName: "Первая публикация" },
        {
            field: "view",
            fieldName: "Просмотр",
            render: (rowData) => (
                <Link to={`${location}/${rowData.id}`}>
                    {location}/{rowData.id}
                </Link>
            ),
        },
        {
            field: "edit",
            fieldName: "Редактирование",
            render: (rowData) => (
                <Link to={`${location}/${rowData.id}/edit`}>
                    {location}/{rowData.id}/edit
                </Link>
            ),
        },
    ];

    return <DataTable columns={columns} data={data} onDelete={onDeleteBook} />;
}
