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
