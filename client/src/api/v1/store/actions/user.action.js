import { apiGetMe, apiUpdateUser } from "../../services/user.services";
import actionTypes from "./actionTypes";

export const getMe = () => async (dispatch) => {
    try {
        console.log('apiGetMe::')
        const response = await apiGetMe();

        if (response.status) {
            dispatch({
                type: actionTypes.GET_ME,
                user: response.data?.user,
                language: response.data?.user?.language
            })
        }
    } catch (error) {
        
    }
}

export const updateUser = (data) => async (dispatch) => {
    try {
        console.log('apiUpdateUser::');
        const response = await apiUpdateUser(data);

        if (response.status) {
            dispatch({
                type: actionTypes.UPDATE_ME,
                user: response.data.user
            })
        }
    } catch (error) {
        
    }
}