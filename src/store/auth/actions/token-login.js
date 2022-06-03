import {ACTION_AUTHEN_VERIFY_TOKEN, ACTION_AUTHEN_VERIFY_TOKEN_ERROR, ACTION_AUTHEN_VERIFY_TOKEN_SUCCESS} from "."
import * as api from "../../../api"
export const verifyTokenRequest = (access_token) => ({
    type: ACTION_AUTHEN_VERIFY_TOKEN,
    payload: {
        token : access_token
    }
})

export const verifyTokenSuccess = data => ({
    type: ACTION_AUTHEN_VERIFY_TOKEN_SUCCESS,
    payload: {
        data
    }
})


export const verifyTokenError = msg => ({
    type: ACTION_AUTHEN_VERIFY_TOKEN_ERROR,
    payload: {
        msg
    }
})



export const verifyToken = (access_token) => {
    return dispatch => {
        dispatch(verifyTokenRequest(access_token))

        api.verifyToken(access_token)
            .then(({data}) => {
                if (data.result.code !== 0) {
                    dispatch(verifyTokenError("error"));
                    return
                }
                dispatch(verifyTokenSuccess({
                    
                }))
            }).catch((err) => {
                console.log(err)
                dispatch(verifyTokenError("system error"))
            });
    }
}