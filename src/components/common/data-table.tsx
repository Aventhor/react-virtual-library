import React from "react";

import styles from "./data-table.module.scss";

interface Props {
    title?: string;
    data: any[];
    columns: {
        field: string;
        fieldName: string;
        render?: (rowData: any) => JSX.Element;
    }[];
    onDelete?: (rowData: any) => void;
}

export default function DataTable(props: Props) {
    const handleDeleteAction = (item: any) => {
        if (props.onDelete) props.onDelete(item);
    };

    return (
        <div className={styles.dataTable}>
            <table>
                {props.title && <caption>{props.title}</caption>}
                <thead>
                    <tr>
                        {props.columns.map((column, index) => {
                            return <th key={index}>{column.fieldName}</th>;
                        })}
                        {props.onDelete && (
                            <th className={styles.dataTable_actionCell} />
                        )}
                    </tr>
                </thead>

                <tbody>
                    {props.data.map((item) => {
                        return (
                            <tr key={item.id}>
                                {props.columns.map((column: any, index) => {
                                    return (
                                        <td key={index}>
                                            {column.render
                                                ? column.render(item)
                                                : item[column.field]}
                                        </td>
                                    );
                                })}
                                {props.onDelete && (
                                    <td className={styles.dataTable_actionCell}>
                                        <button
                                            onClick={() =>
                                                handleDeleteAction(item)
                                            }
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!props.data.length && (
                <div className={styles.dataTable_notFound}>
                    Записей не найдено
                </div>
            )}
        </div>
    );
}
