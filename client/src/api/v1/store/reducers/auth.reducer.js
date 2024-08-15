import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    message: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                message: ''
            }
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                message: ''
            }
    
        default:
            return state;
    }
}

export default authReducer;