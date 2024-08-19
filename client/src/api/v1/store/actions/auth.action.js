import actionTypes from "./actionTypes";
import {apiSignIn, apiSignUp} from '../../services/auth.services'

export const signUp = (payload) => async (dispatch) => {
    try {
        const response = await apiSignUp(payload);
        const { status, message } = response.data;
        if (!status) {
            dispatch({
                type: actionTypes.SIGN_UP,
                message,
                signUpSuccess: false
            })
        } else {
            // dang ky thanh cong thi lam gi
            // sua lai nhe, nay khong phai dau
            dispatch({
                type: actionTypes.SIGN_UP,
                signUpSuccess: true,
            })

        }

    } catch (error) {
        
    }
}

export const resetSignUpSuccess = () => ({
    type: actionTypes.SIGN_UP,
    signUpSuccess: false,
})

export const signIn = (payload) => async (dispatch) => {
    try {
        const response = await apiSignIn(payload);
        const { status, accessToken, message, user } = response.data;
        if (status) {
            dispatch({
                type: actionTypes.SIGN_IN,
                accessToken,
                message,
                userInfo: user
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

export const signOut = () => ({
    type: actionTypes.SIGN_OUT
})
