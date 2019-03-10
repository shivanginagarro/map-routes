import axios from 'axios';
import { baseURL } from '../../configurations/constants/index';

export const API = axios.create({
   baseURL
})