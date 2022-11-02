import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://94.181.21.237:5000/api/'
});