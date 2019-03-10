import axios from 'axios';
import { baseURL } from '../../configurations/axios/axios-setting-constants';

export const API = axios.create({
   baseURL
})