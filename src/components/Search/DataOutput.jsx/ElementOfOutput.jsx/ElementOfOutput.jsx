import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ElementOfOutput.module.css';


function ElementOfOutput(title, id) {

    const dispatch = useDispatch();
    const typeOfSearch = useSelector(state => state.typeOfSearch);

    return (
        <div>
            <button className={styles.button}>
                <span className={styles.title}>{title.title}</span>
                <span className={styles.id}>ID: {title.id}</span>
            </button>
        </div>
    )
}

export default ElementOfOutput