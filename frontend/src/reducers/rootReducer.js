import { combineReducers } from "redux";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";

const rootReducer = combineReducers({
    Categories: categoryReducers,
    products: productReducers
});

export default rootReducer;