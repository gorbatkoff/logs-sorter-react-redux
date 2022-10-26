import React, { useEffect, useState } from "react";
// import "./App.css";

import styles from './Main.module.css';

import Dropzone from "react-dropzone";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import Status from "../Status/Status";
// import Archive from "./pages/Archive";

function Main() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [resultOfResponse, setResultOfResponse] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", files[0]);
        try {
            const response = await axios({
                method: "post",
                url: "http://94.181.20.84:5000/api/Archive/UploadArchive",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            setResultOfResponse(response.data)
            setOpen(true);

            if (response.data.status === 0) {
                setTimeout(async () => {
                    window.location.replace(`http://localhost:3000/check-id:${response.data.archive.id}`)
                }, 2000)
            }


        } catch (error) {
            console.log(error.message)
        }
    }

    async function archiveStatusHandler(response) {
        return <div>Hello world</div>
    }

    const [open, setOpen] = useState(false); // State of snack bar

    const [files, setFiles] = useState(); // State of
    const [fileNames, setFileNames] = useState([]); // State of files

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });



    const handleDrop = (acceptedFiles) => {
        setFileNames(acceptedFiles.map(file => file.name))
        setFiles(acceptedFiles);
    };





    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (
        <div className={styles.main}>

            <div className={styles['first-block']}>

                <h2 align="center">Загрузка архива</h2>


                <div className={styles.download}>
                    <Dropzone onDrop={handleDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} id="input" />
                                <p>Выберите 1 файл для отправки весом не более 1 ГБ</p>
                            </div>
                        )}
                    </Dropzone>


                    <div style={{ display: "flex", justifyContent: "center", }}>
                        <Button variant="contained" sx={{
                            background: "linear-gradient(90deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)"
                        }}
                            size="large" onClick={handleSubmit}>
                            Отправить
                        </Button>
                    </div>
                    <div>
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Note archived"
                            action={action}
                        >
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Файлы обработаны успешно!
                            </Alert>
                        </Snackbar>
                    </div>
                </div>



                <div className={styles.files}>
                    <h3>Выбранный файл:</h3>
                    <ul>
                        {fileNames.map(fileName => (
                            <li key={fileName}>{fileName}</li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className={styles.result}>

                <h2 align="center">Результат проверки</h2>

                <div>
                    {
                        resultOfResponse
                            ?

                            // archiveStatusHandler(resultOfResponse)
                            <Status resultOfResponse={resultOfResponse} />


                            :

                            <></>
                    }
                </div>

            </div>

        </div>
    )
}

export default Main