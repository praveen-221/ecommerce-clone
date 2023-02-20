import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import registerReducers from "./register.reducers";
import productReducers from "./product.reducers";
import orderReducers from "./orders.reducers";
import categoryReducers from "./category.reducers";
import pageReducers from "./page.reducers";

const rootReducer = combineReducers({
    auth: authReducers,
    register: registerReducers,
    products: productReducers,
    orders: orderReducers,
    Categories: categoryReducers,
    pages: pageReducers
});

export default rootReducer;