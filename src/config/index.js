import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://91.220.69.117:5000/api/'
});