import React, { useState, useEffect } from 'react';
import { api } from '../config';


function Archive() {

    const [archiveInfo, setArchiveInfo] = useState({});

    const getArchiveById = async () => {
        try {
            const request = await api.get("http://94.181.20.84:5000/api/Archive/GetArchiveInformationById?archiveId=2");

            setArchiveInfo(request.data);

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getArchiveById();
    }, [])

    console.log(archiveInfo.archiveInformation)

    return (
        <div>
        </div>
    )
}

export default Archive