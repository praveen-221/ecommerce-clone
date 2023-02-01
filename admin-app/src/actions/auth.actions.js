import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        // send post request to http://localhost:5000/api/admin/login using axios & store the response
        const res = await axios.post("/admin/login", {
            ...user
        });

        if(res.status === 200 || res.status === 201){
            const { token, user } = res.data;
            localStorage.setItem('token',token);    // Storing the JWT token in local browser inorder to access it within expiry period
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else {
            if(res.status === 400 || res.status === 404){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: res.data.message
                    }
                });
            }
        }
    }
};

export const isLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: "Not logged In"
                }
            });
        }
    }
};

export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post("/admin/signout");
        if(res.status === 200){
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
        }
        else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}