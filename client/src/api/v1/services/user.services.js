import axiosConfig from '../../../axiosConfig';
import { domain } from '../utils/constant';

export const apiGetMe = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/user/getMe`,
        })
        return response
    } catch (error) {

    }
}

export const apiUpdateUser = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'patch',
            url: `${domain}/user/updateMe`,
            data: payload,
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })

        return response
    } catch (error) {

    }
}