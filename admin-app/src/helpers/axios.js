import axios from "axios";
import { authConstants } from "../actions/constants";
import store from "../store";
import { baseUrl } from "./urlConfig";

const token = localStorage.getItem('token');
console.log(token);

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

// handle jwt token expiry
// interceptors can be used to intercept requests or responses before they are handled by then or catch func
axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    // Use the latest session token from store in case of new login
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    const { status } = error.response;
    if(status && (status === 500 || status === 404)) {
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
});

export default axiosInstance;