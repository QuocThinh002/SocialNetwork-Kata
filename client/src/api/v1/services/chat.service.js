import axiosConfig from '../../../axiosConfig';
import { domain } from '../utils/constant';

export const apiGetConversation = async (convId) => {
    try {
        // console.log("getConversation::")
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
        console.log('errr:' ,error)
    }
}

export const apiAddMembersGroupChat = async (data) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/chat/addMembersGroupChat/`,
            data
        })
        console.log('response::::', response)
        return response

    } catch (error) {
        console.log('errr:' ,error)
    }
}

export const apiMessageForward = async (data) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/chat/messageForward/`,
            data,
            // headers: {
            //     'Content-Type': "multipart/form-data"
            // }
        })
        console.log('response::::', response)
        return response

    } catch (error) {
        console.log('errr:' ,error)
    }
}


