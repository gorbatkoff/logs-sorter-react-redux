import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArchiveInfoOutput from '../ArchiveInfoOutput/ArchiveInfoOutput';
import { api } from './../../config/index';

function Result() {

    const [archiveInfo, setArchiveInfo] = useState(null);
    const [queuePosition, setQueuePosition] = useState(null);

    const id = parseInt(useParams().id.replace(/:/g, ""));

    console.log(id)

    function reloadPage() {
        if (queuePosition === 0) {
            setTimeout(() => {
                window.location.reload();
                console.log('Page was reload')
            }, 1000)
        }
    }

    async function getArchiveInfoById() {
        try {
            const response = await api.get(`Archive/GetArchiveInformationById?archiveId=${id}`)

            console.log(response.data)

            setArchiveInfo(response.data);

            setQueuePosition(response.data.archiveInformation.positionInQueue);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getArchiveInfoById();
    }, []);

    return (
        <div>
            {queuePosition === 0
                ?
                <Container>
                    <h2>Результат проверки архива</h2>
                    <ArchiveInfoOutput archive={archiveInfo.archiveInformation} />
                </Container>
                :
                <div>
                    <p>Ваша позиция в очереди: {queuePosition}. Ожидайте.</p>
                    <p>Страница обновляется каждый 30 секунд</p>
                    {reloadPage()}
                </div>
            }
        </div>
    )
}

export default Result