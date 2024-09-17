import axiosConfig from '../../../axiosConfig';
import { domain } from '../utils/constant';

export const apiGetMe = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/user/me`,
        })
        return response
    } catch (error) {

    }
}

export const apiGetFriends = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/user/friends`,
        })
        return response
    } catch (error) {

    }
}

export const apiGetUser = async (userId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/user/user/${userId}`,
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


export const apiSearchUser = async (email) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/user/search?email=${email}`
        })

        return response
    } catch (error) {

    }
}

export const apiAddFriend = async (friendId) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `${domain}/user/addFriend`,
            data: friendId
        })

        return response
    } catch (error) {

    }
}

export const apiGetFriendRequests = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/user/friendRequests`,
        })

        return response
    } catch (error) {

    }
}

export const apiCancelAddFriend = async (friendId) => {
    try {
        const response = await axiosConfig({
            method: 'patch',
            url: `${domain}/user/cancelAddFriend`,
            data: friendId
        })

        return response
    } catch (error) {

    }
}





