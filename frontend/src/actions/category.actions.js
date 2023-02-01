import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategories = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get('/category/getCategories');
        
        if(res.status === 200 || res.status === 201){
            const { Categories } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: Categories
                }
            });
        }
        else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    };
}