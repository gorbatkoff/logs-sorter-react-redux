import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.first}>
                <Link to="/">Главная</Link>
                <Link to="/check-by-id">Проверить архив по Id</Link>
                <Link to="/search">Поиск</Link>
            </div>

            <div>
                <Link to="/support">Support</Link>
            </div>
        </header>
    )
}

export default Header