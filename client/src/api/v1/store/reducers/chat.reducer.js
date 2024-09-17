
import actionTypes from "../actions/actionTypes";

const initState = {
    convs: []
}

const chatReducer = (state = initState, action) => {
    try {
        console.log('action.convs::', action.convs)
        console.log('action.type::', action.type)
        switch (action.type) {
            case actionTypes.GET_CONVERSATIONS:
                return {
                    ...state,
                    convs: action.convs
                }
            default:
                return state;
        }
    } catch (error) {

    }
}

export default chatReducer