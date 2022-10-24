import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://94.181.20.84:5000/api/'
});