import axiosConfig from '../../../axiosConfig';
import { domain } from '../utils/constant';

export const apiCreatePost = async (data) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/post/create/`,
            data,
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
        console.log('response::::', response)
        return response

    } catch (error) {
        console.log('errr:' ,error)
    }
}

export const apiGetPosts = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/post/`
        })
        console.log('response::::', response)
        return response

    } catch (error) {
        console.log('errr:' ,error)
    }
}