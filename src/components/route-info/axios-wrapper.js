import axios from 'axios';
import { baseURL } from './config.js';

export const API = axios.create({
   baseURL
})