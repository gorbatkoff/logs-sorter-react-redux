import React, { useState, useEffect } from 'react'
import styles from './Search.module.css';

import { TextField, Select, Button, MenuItem, InputLabel, Box, FormControl } from '@mui/material';


function Search() {

    const [typeOfSearch, setTypeOfSearch] = useState('');

    const handleChange = (event) => {
        setTypeOfSearch(event.target.value);
    };

    return (
        <div className={styles.search}>
            <TextField id="outlined-basic" label="Текст" variant="outlined" sx={{ width: '50%',}}/>

            <Box sx={{ width: '25%',}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип поиска</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeOfSearch}
                        label="Тип поиска"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Sites"}>Sites</MenuItem>
                        <MenuItem value={"Emails"}>Emails</MenuItem>
                        <MenuItem value={"UserDatas"}>UserDatas</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button variant="contained" size="large" sx={{
                background: "linear-gradient(90deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)", 
                color: "#fff"}}
                >Поиск</Button >
        </div>
    )
}

export default Search