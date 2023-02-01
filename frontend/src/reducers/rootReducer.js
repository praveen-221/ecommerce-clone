import { combineReducers } from "redux";
import categoryReducers from "./category.reducers";

const rootReducer = combineReducers({
    Categories: categoryReducers
});

export default rootReducer;