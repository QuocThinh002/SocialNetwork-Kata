import axiosConfig from '../../../axiosConfig';
import { domain } from '../utils/constant';

export const apiGetConversation = async (convId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/chat/conversation/${convId}`,
        })
        return response
    } catch (error) {

    }
}

export const apiGetConversationsInfo = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/chat/conversations/`,
        })
        return response
    } catch (error) {

    }
}

export const apiGetCreateConv = async (otherUserId) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/chat/get-create-conv/${otherUserId}`
        })
        return response

    } catch (error) {
        
    }
}

export const apiCreateGroup = async (data) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/chat/createGroup/`,
            data,
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
        console.log('response::::', response)
        return response

    } catch (error) {
        console.lcg('errr:' ,error)
    }
}

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
        console.lcg('errr:' ,error)
    }
}
