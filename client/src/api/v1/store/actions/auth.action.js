import actionTypes from "./actionTypes";
import {apiSignIn, apiSignUp} from '../../services/auth.services'

export const signUp = (payload) => async (dispatch) => {
    try {
        const response = await apiSignUp(payload);
        console.log(response)

    } catch (error) {
        
    }
}

export const signIn = (payload) => async (dispatch) => {
    try {
        const response = await apiSignIn(payload);
        const { status, token } = response.data;
        if (status) {
            dispatch({
                type: actionTypes.SIGN_IN,
                token
            })
        } else {

        }

    } catch (error) {
        
    }
}

export const signOut = () => ({
    type: actionTypes.SIGN_OUT
})