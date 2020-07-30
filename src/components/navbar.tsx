import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./navbar.module.scss";

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <ul className={styles.links}>
                <li>
                    <NavLink to="/" exact activeClassName={styles.activeLink}>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/books" activeClassName={styles.activeLink}>
                        Книги
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/authors" activeClassName={styles.activeLink}>
                        Авторы
                    </NavLink>
                </li>
            </ul>
        </header>
    );
}
