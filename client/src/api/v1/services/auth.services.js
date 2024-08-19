import axiosConfig from '../../../axiosConfig'

const domain = '/api/v1';

export const apiSignUp = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/kata/signup`,
            data: payload
        })
        return response;
    } catch (error) {

    }

}

export const apiSignIn = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/kata/signin`,
            data: payload
        })
        return response
    } catch (error) {

    }
}

export const apiSignOut = async () => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/kata/signout`,
        })
        return response
    } catch (error) {
        
    }
}

export const apiVerifyAccount = async (verificationToken) => {
    try {
        const response = await axiosConfig({
            method: 'get', 
            url: `${domain}/kata/verify-account/${verificationToken}`
        })
        return response
    } catch(error) {
        
    }
}

export const apiForgotPassword = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post', 
            url: `${domain}/kata/forgot-password`,
            data: payload
        })
        return response
    } catch (error) {
        
    }
}

export const apiResetPassword = async ({resetPwToken, password}) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/kata/reset-password/${resetPwToken}`,
            data: {password}
        })
        return response;
    } catch (error) {
        
    }
}