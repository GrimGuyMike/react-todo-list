import { AUTH } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null
};

export default function authReducer(state=initialState, action) {
    switch(action.type) {
        default:
            return { ...state };

        case AUTH.USER_LOADING:
            return {
                ...state,
                loading: true
            };

        case AUTH.LOAD_USER:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email
                }
            };

        case AUTH.REGISTER_FAIL:
        case AUTH.LOGIN_FAIL:
        case AUTH.LOAD_USER_FAIL:
        case AUTH.DELETE_USER:
        case AUTH.LOGOUT:
        case AUTH.REFRESH_FAIL: {
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        };

        case AUTH.REGISTER:
        case AUTH.LOGIN: {
            localStorage.setItem('token', action.payload.access.token);
            return {
                token: action.payload.access.token,
                isAuthenticated: true,
                loading: false,
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email
                }
            };
        };

        case AUTH.REFRESH: {
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload
            };
        }
    }
};