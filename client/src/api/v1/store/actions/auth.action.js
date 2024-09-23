import actionTypes from "./actionTypes";
import {apiSignIn, apiSignOut, apiSignUp} from '../../services/auth.service'

export const signUp = (response) => async (dispatch) => {
    try {
        const { status, message } = response;
        if (!status) {
            dispatch({
                type: actionTypes.SIGN_UP,
                message
            })
        }
        return status

    } catch (error) {
        
    }
}

export const signIn = (payload) => async (dispatch) => {
    try {
        const response = await apiSignIn(payload);
        const { status, token, message } = response.data;
        if (status) {
            dispatch({
                type: actionTypes.SIGN_IN,
                accessToken: token,
                message,
            })
        } else {
            dispatch({
                type: actionTypes.SIGN_IN_FAIL,
                message
            })
        }

    } catch (error) {
        
    }
}

export const signOut = () => async (dispatch) => {
    try {
        const response = await apiSignOut();
        
        if (response.data.status || true) {
            dispatch({
                type: actionTypes.SIGN_OUT
            })
        }
    } catch (error) {
        
    }
}

export const signOutTokenExpired = () => async (dispatch) => {
    try {
        
            dispatch({
                type: actionTypes.SIGN_OUT
            })
    } catch (error) {
        
    }
}