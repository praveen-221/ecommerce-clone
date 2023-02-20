import axios from "axios";
import { baseUrl } from "./urlConfig";

const token = localStorage.getItem('token');
// console.log(token);

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

export default axiosInstance;