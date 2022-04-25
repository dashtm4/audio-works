import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/${API_URL}`,
});

export default axiosInstance;
