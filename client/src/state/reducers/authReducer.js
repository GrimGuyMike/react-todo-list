import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    USER_LOADING,
    USER_LOADED,
    DELETE_USER_SUCCESS
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null
};

export default function authReducer(state=initialState, action) {

    switch(action.type) {

        default:
            return state;

        case USER_LOADING:
            return {
                ...state,
                loading: true
            };

        case USER_LOADED:
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

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case DELETE_USER_SUCCESS:
        case LOGOUT_SUCCESS: {
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: {
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

    }

};