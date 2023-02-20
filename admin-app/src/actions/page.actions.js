import axios from "../helpers/axios";
import { pageConstants } from "./constants"

export const createPage = (form) => {
    return async (dispatch) => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });

        try{
            const res = await axios.post("/admin/page/create", form);
            if(res.status === 200 || res.status === 201) {
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCESS,
                    payload: { page: res.data.page }
                });
            } else {
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    payload: { msg: "Error creating page ;(", error: res.data.error }
                });
            }
        }
        catch(error) {
            console.log(error);
        }
    }
} 