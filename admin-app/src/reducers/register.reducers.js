import { registerConstants } from "../actions/constants"

const initstate = {
    error: '',
    message: '',
    severity: '',
    loading: false
};

export default (state = initstate, action) => {
    switch(action.type) {
        case registerConstants.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case registerConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                severity: action.payload.severity
            }
            break;
        case registerConstants.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error,
                severity: action.payload.severity
            }
            break;
    }
    return state;
}