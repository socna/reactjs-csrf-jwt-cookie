import {ACTION_AUTHEN_VERIFY_TOKEN, ACTION_AUTHEN_VERIFY_TOKEN_ERROR, ACTION_AUTHEN_VERIFY_TOKEN_SUCCESS} from "../actions"
const initState = {
    erro_msg: undefined,
    data: undefined,
    isLoading: false
}


export const verifyTokenReducer = (state = initState, action = {}) => {
    switch(action.type){
        case ACTION_AUTHEN_VERIFY_TOKEN:
            return {...state, isLoading: true, erro_msg: undefined}

        case ACTION_AUTHEN_VERIFY_TOKEN_SUCCESS:
            return { ...state, isLoading: false, erro_msg: undefined}

        case ACTION_AUTHEN_VERIFY_TOKEN_ERROR:
            return { ...state, isLoading: false, erro_msg: action.payload.msg }

        default:
            return state;
    }
}