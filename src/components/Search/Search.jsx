import React, { useState } from 'react'
import DataOutput from './DataOutput.jsx/DataOutput';

import { TextField, Select, Button, MenuItem, InputLabel, Box, FormControl, Container } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import styles from './Search.module.css';

import { api } from './../../config/index';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import FileSaver from "file-saver";

function Search() {

    const [data, setData] = useState();
    const [logs, setLogs] = useState();

    const [typeOfSearch, setTypeOfSearch] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const countOfItems = useSelector(state => state.itemsCount);


    async function getSites(data) {
        try {
            const request = await api.get(`Site/GetSites?Search=${data.search}`);

            dispatch({ type: "CHANGE_COUNT_OF_ITEMS", payload: request.data.paginationSites.totalItems });

            console.log(countOfItems)

            console.log(request.data.paginationSites.items);
            setData(request.data.paginationSites.items);

        } catch (error) {
            console.log(error);
        }
    }

    async function getEmails(data) {
        try {
            const request = await api.get(`Email/GetEmails?Search=${data.search}`);

            console.log(request.data.paginationEmails.items);
            setData(request.data.paginationEmails.items);

        } catch (error) {
            console.log(error);
        }
    }

    async function getUserDatas(data) {
        try {
            const request = await api.get(`Userdata/GetUserdatas?Search=${data.search}`);

            console.log(request.data.paginationUserdatas.items);
            setData(request.data.paginationUserdatas.items);

        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(data, typeOfSearch) {

        switch (data.type) {
            case 'Emails':
                return getEmails(data);
            case 'Sites':
                return getSites(data);
            case 'UserDatas':
                return getUserDatas(data);
            default:
                return null;
        }

    }

    async function outputLogins(data) {

        const id = data['search-by-id'];

        try {
            const request = await axios.get(`http://94.181.21.237:5000/api/Userdata/GetFileUserdatasBySiteId?SiteId=${id}`);

            setLogs(() => request.data.split('\n'));

        } catch (error) {
            console.log(error);
        }

    }

    function createBlob() {

        var blob = new Blob(logs, {
            type: "text/plain;charset=utf-8"
        });

        FileSaver.saveAs(blob, `Logs.txt`);
    }

    const handleChangeType = (event) => {
        setTypeOfSearch(event.target.value);
        setData();
    };

    return (
        <div style={{ paddingTop: "3em" }}>

            <h3>Поиск по базам</h3>
            <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("search")} id="outlined-basic" label="Что будем искать?" variant="outlined"
                    sx={{ width: '50%', }} placeholder="Id / Text search" />

                <Box sx={{ width: '25%', }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Где искать?</InputLabel>
                        <Select
                            {...register("type")}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeOfSearch}
                            label="Тип поиска"
                            onChange={handleChangeType}
                        >
                            <MenuItem value={"Sites"}>По сайтам</MenuItem>
                            <MenuItem value={"Emails"}>По почтам</MenuItem>
                            <MenuItem value={"UserDatas"}>По данным</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" size="large"
                    sx={{
                        background: "linear-gradient(90deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)",
                        color: "#fff"
                    }}
                >Поиск</Button >
            </form>

            {
                data
                    ?
                    <DataOutput data={data} type={typeOfSearch} />
                    :
                    <Container>
                        <h4 align="center">Нажмите кнопку «Поиск»</h4>
                    </Container>
            }

            <h3>Поиск по логинами и паролям</h3>

            <form className={styles['second-search']} onSubmit={handleSubmit(outputLogins)}>
                <TextField {...register("search-by-id")} id="outlined-basic" label="Введите Id" variant="outlined"
                sx={{ width: '40%'}} placeholder="353" />


                <Button type="submit" variant="contained" size="large"
                    sx={{
                        background: "linear-gradient(90deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)",
                        color: "#fff"
                    }}
                >Получить логи</Button >

                {logs
                    ?
                    <Button variant="contained" size="large"
                        sx={{ background: "red", textTransform: 'none', background: 'linear-gradient(90deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)' }}
                        endIcon={<CloudDownloadIcon />} onClick={createBlob}>
                        Скачать логи
                    </Button>
                    :
                    <></>
                }
            </form>


        </div>
    )
}

export default Search