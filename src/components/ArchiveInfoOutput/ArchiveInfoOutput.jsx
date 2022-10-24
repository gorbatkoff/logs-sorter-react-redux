import React, { useState, useEffect } from 'react';

import styles from './ArchiveInfoOutput.module.css'

function ArchiveInfoOutput(archive) {


    console.log(archive)

    return (
        <div className={styles.output}>
            <div>
                Директорий:
                <span className={archive.archive.directoriesCount > 0 ? styles.green : styles.red}>
                    {archive.archive.directoriesCount}
                </span>
            </div>

            <div>
                Неудачных директорий:
                <span className={archive.archive.directoriesNotSuccessCount == 0 ? styles.green : styles.red}>
                    {archive.archive.directoriesNotSuccessCount}
                </span>
            </div>
            <div>
                Удачных директорий:
                <span className={archive.archive.directoriesSuccessCount > 0 ? styles.green : styles.red}>
                    {archive.archive.directoriesSuccessCount}
                </span>
            </div>

            <div>
                Почтовых адресов:
                <span className={archive.archive.emailsCount > 0 ? styles.blue : styles.red}>
                    {archive.archive.emailsCount}
                </span>
            </div>

            <div>
                Уникальных почтовых адресов:
                <span className={archive.archive.emailsUniqueCount > 0 ? styles.blue : styles.red}>
                    {archive.archive.emailsUniqueCount}
                </span>
            </div>
            <div>
                Сайтов:
                <span className={archive.archive.sitesCount > 0 ? styles.blue : styles.red}>
                    {archive.archive.sitesCount}
                </span>
            </div>
            <div>
                Уникальных сайтов:
                <span className={archive.archive.sitesUniqueCount > 0 ? styles.blue : styles.red}>
                    {archive.archive.sitesUniqueCount}
                </span>
            </div>
            <div>
                Пользовательских данных:
                <span className={archive.archive.sitesUniqueCount > 0 ? styles.blue : styles.red}>
                    {archive.archive.sitesUniqueCount}
                </span>
            </div>
            <div>
                Уникальных пользовательских данных:
                <span className={archive.archive.sitesUniqueCount > 0 ? styles.blue : styles.red}>
                    {archive.archive.sitesUniqueCount}
                </span>
            </div>
        </div>
    )
}

export default ArchiveInfoOutput