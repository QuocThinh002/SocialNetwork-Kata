import { apiGetConversationsInfo } from "../../services/chat.services";
import actionTypes from "./actionTypes";


export const getConversationsInfo = () => async (dispatch) => {
    try {
        console.log('apiGetConversations::')
        const response = await apiGetConversationsInfo();

        if (response?.data?.success) {
            dispatch({
                type: actionTypes.GET_CONVERSATIONS,
                convs: response?.data?.convs
            })
        }
    } catch (error) {
        
    }
}