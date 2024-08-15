import axiosConfig from '../../../axiosConfig'

const domain = '/api/v1';

export const apiSignUp = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/auth/kata/signup`,
            data: payload
        })
        console.log(response)
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

        console.log(response)
        return response
    } catch (error) {

    }
}