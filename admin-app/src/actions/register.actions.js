import axios from "../helpers/axios";
import { registerConstants } from "./constants";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: registerConstants.REGISTER_REQUEST });
        // send post request to http://localhost:5000/api/admin/login using axios & store the response
        const res = await axios.post("/admin/signup", {
            ...user
        });

        if(res.status === 200 || res.status === 201){
            const { message } = res.data;
            dispatch({
                type: registerConstants.REGISTER_SUCCESS,
                payload: {
                    message
                }
            });
        }
        else {
            if(res.status === 400 || res.status === 404){
                dispatch({
                    type: registerConstants.REGISTER_FAILURE,
                    payload: {
                        message: res.data.message,
                        error: res.data.error
                    }
                });
            }
        }
    }
};