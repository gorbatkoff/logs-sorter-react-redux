import React, { useState, useEffect } from 'react'

import { TextField, Select, Button, MenuItem, InputLabel, Box, FormControl, Container } from '@mui/material';
import { useForm } from 'react-hook-form';

import { api } from './../../config/index';

import styles from './Search.module.css';
import DataOutput from './DataOutput.jsx/DataOutput';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import FileSaver from "file-saver";
import { Co2Sharp } from '@mui/icons-material';

function Search() {

    const dispatch = useDispatch();
    const countOfItems = useSelector(state => state.itemsCount);

    const [logs, setLogs] = useState();

    const getFiles = async (id) => {

        try {
            const request = await axios.get(`http://94.181.21.237:5000/api/Userdata/GetFileUserdatasBySiteId?SiteId=${id}`);

            setLogs(request.data.split('\n'));

        } catch (error) {
            console.log(error);
        }

    }

    function createBlob() {
        var blob = new Blob(logs, {
            type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, "Logs.txt");
    }

    const [data, setData] = useState();

    const [typeOfSearch, setTypeOfSearch] = useState('');
    const [placeOfSearch, setPlaceOfSearch] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

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

        console.log(data);

        if (data.place === 'logs') {
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

        if (data.place === 'files') {
            getFiles(data.search);
            setTypeOfSearch('Sites');
        }

    }

    const handleChangeType = (event) => {
        setTypeOfSearch(event.target.value);
        setData();
    };

    const handleChangePlace = (event) => {
        setPlaceOfSearch(event.target.value);
        setData()
    }

    return (
        <div>

            <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("search")} id="outlined-basic" label="Что будем искать?" variant="outlined"
                    sx={{ width: '50%', }} placeholder="Id / Text search" />

                <Box sx={{ width: '25%', }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Что искать?</InputLabel>
                        <Select
                            {...register("place")}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={placeOfSearch}
                            label="Тип поиска"
                            onChange={handleChangePlace}
                        >
                            <MenuItem value={"logs"}>Логи</MenuItem>
                            <MenuItem value={"files"}>Логин/Пароли</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

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
                        <h2 align="center">Нажмите кнопку «Поиск»</h2>
                        <p align="center">Внимание! Поиск Логин/Паролей возможен только по сайтам. <br />
                            Также в поле ввода необходимо ввести Id сайта по которому хотите осуществить поиск логинов</p>
                    </Container>
            }

            {logs
                ?
                <Button sx={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }} onClick={createBlob}>Скачать Логины / Пароли</Button>
                :
                <></>
            }
        </div>
    )
}

export default Search