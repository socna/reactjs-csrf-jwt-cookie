import axios from 'axios';
import {VERIFY_TOKEN_ENDPOINT} from "./endpoint"

const anonRequest = (_data, url) => {
    let data = JSON.stringify(_data);
    let config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    return axios(config);
}

export const verifyToken = (token) => {
    return anonRequest({token: token}, VERIFY_TOKEN_ENDPOINT)
}
