import React from 'react'
import ElementOfOutput from './ElementOfOutput/ElementOfOutput'

import { Container } from '@mui/material'
import Pagination from '@mui/material/Pagination';

import styles from './DataOutput.module.css'

function DataOutput({ data, type }) {


    return (
        <div style={{ paddingTop: "2em" }}>
            <h2 align="center">Получены следующие сервисы:</h2>

            <div className={styles.buttons}>

                {type === 'Sites' ?

                    data.map((item) => {
                        return <ElementOfOutput title={item.site} id={item.id} key={item.id} type={type} />
                    })

                    : type === 'Emails' ? data.map((item) => {
                        return <ElementOfOutput title={item.email} id={item.id} key={item.id} type={type} />
                    })

                        :
                        data.map((item) => {
                            return <ElementOfOutput title={item.login} id={item.id} key={item.id} type={type} />
                        })
                }
            </div>
{/* 
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
                <Pagination count={10} variant="outlined" color="primary" />
            </div> */}
        </div>
    )
}

export default DataOutput