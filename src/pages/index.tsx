import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="page">
            <div className="page-header-container">
                <h2>Главная</h2>
            </div>
            <ul>
                <li>
                    <Link to="/books">Книги</Link>
                </li>

                <li>
                    <Link to="/authors">Авторы</Link>
                </li>
            </ul>
        </div>
    );
};

export default Index;
