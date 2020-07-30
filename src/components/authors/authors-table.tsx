import React from "react";
import DataTable from "../common/data-table";
import { Author } from "../../interfaces/author";
import { Link } from "react-router-dom";

interface Props {
    authors: Author[];
    location: string;
    onDeleteAuthor: (author: Author) => void;
}

export default function AuthorsTable({
    authors,
    onDeleteAuthor,
    location,
}: Props) {
    const columns = [
        { field: "last_name", fieldName: "Фамилия" },
        { field: "first_name", fieldName: "Имя" },
        {
            field: "view",
            fieldName: "Просмотр",
            render: (rowData: any) => (
                <Link to={`${location}/${rowData.id}`}>
                    {location}/{rowData.id}
                </Link>
            ),
        },
        {
            field: "edit",
            fieldName: "Редактирование",
            render: (rowData: any) => (
                <Link to={`${location}/${rowData.id}/edit`}>
                    {location}/{rowData.id}/edit
                </Link>
            ),
        },
    ];

    return (
        <DataTable columns={columns} data={authors} onDelete={onDeleteAuthor} />
    );
}
