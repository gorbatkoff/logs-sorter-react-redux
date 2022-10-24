import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Status({ resultOfResponse }) {

    function responseStatusHandler(resultOfResponse){
        switch (resultOfResponse.status){
            case 0:
                return <Alert severity="success">
                    <AlertTitle>Успех!</AlertTitle>
                    Через пару секунд вы будете <strong>перенаправлены</strong> на страницу очереди
                </Alert>
            
            case 1:
                return <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Archive Not Found — <strong>check it out!</strong>
              </Alert>
            case 7:
                return <Alert severity="warning">This archive already exists</Alert>
        }
    }

    return (
        <div>
            {responseStatusHandler(resultOfResponse)}
        </div>
    )
}

export default Status