import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    productsByPrice: {
      under5k: [],
      under10k: [],
      under20k: [],
      under30k: [],
      under40k: [],
      under50k: [],
      under60k: [],
      above60k: []
    }
};

export default (state = initState, action) => {
    switch(action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
    }
    return state;
}