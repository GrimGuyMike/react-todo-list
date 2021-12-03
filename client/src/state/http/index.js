import axios from 'axios';
import store from '../store';
import { getErrors } from '../actions/errorActions';
import { refresh } from '../actions/authActions';
import { AUTH } from '../actions/types';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: () => true
});

api.interceptors.request.use(config => {
    config.headers["Authorization"] = `Bearer ${store.getState().auth.token}`;
    return config;
}, err => Promise.reject(err));

api.interceptors.response.use(async res => {
    const originalConfig = res.config;

    if(res.status === 401 && !originalConfig._isRetry) {
        try {
            originalConfig._isRetry = true;
    
            const res = await axios.post(`${originalConfig.baseURL}/refresh`, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = res.data.token;
            store.dispatch(refresh(token));
    
            return api.request(originalConfig);
        } catch(err) {
            store.dispatch(getErrors(err.response.data.message, err.response.status, AUTH.REFRESH_FAIL));
        }
    }

    res.ok = res.status < 300 ? true : false;
    return res;
}, err => Promise.reject(err));

export default api;