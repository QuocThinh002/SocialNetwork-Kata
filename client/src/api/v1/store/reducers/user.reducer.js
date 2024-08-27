import actionTypes from "../actions/actionTypes";

const initState = {
    user: null,
    language: 'vi',
}

const userReducer = (state = initState, action) => {
    try {
        switch (action.type) {
            case actionTypes.GET_ME:
            case actionTypes.UPDATE_ME:
                return {
                    ...state,
                    user: action.user,
                    language: action.language
                }
            case actionTypes:
                return {
                    ...state,
                    friends: action.friends
                }




            default:
                return state;
        }
    } catch (error) {

    }
}

export default userReducer