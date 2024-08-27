import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    accessToken: null,
    message: '',
    messageSignUp: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.accessToken,
                message: action.message
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                message: action.message
            }
        
        case actionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                message: action.message
            }
        case actionTypes.SIGN_UP:
            return {
                ...state,
                messageSignUp: action.message
            }
    
        default:
            return state;
    }
}

export default authReducer;