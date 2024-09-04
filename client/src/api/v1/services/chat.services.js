import axiosConfig from '../../../axiosConfig';
import { domain } from '../utils/constant';

export const apiGetConversation = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `${domain}/chat/conversation`,
        })
        return response
    } catch (error) {

    }
}
