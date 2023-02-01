import { authConstants } from "../actions/constants"

// initially values for the state of admin user
const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        picture: ''
    },
    authenticating: false,
    authenticated: false,
    loading: false,
    error: null,
    message: ''
}

export default (state = initState, action) => {
    // action.type is the type mentioned in dispatch func
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticating: false,
                authenticated: true
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}