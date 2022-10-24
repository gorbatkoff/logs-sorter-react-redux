import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.first}>
                <a href="/">Главная</a>
                <a href="/check-by-id">Проверить архив по Id</a>
            </div>

            <div>
                <a href="/support">Support</a>
            </div>
        </header>
    )
}

export default Header