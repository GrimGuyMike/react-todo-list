import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    USER_LOADING,
    USER_LOADED,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "./types";
import { getErrors, clearErrors } from "./errorActions";
import { fetchTodos, eraseTodos, deleteTodos } from "./todoActions";

export const headersConfig = getState => {

    const headers = {
        "Content-Type": "application/json"
    };
    
    const token = getState().auth.token;
    if(token) headers['x-auth-token'] = token;

    return headers;

};

export const register = userData => (dispatch, getState) => {

    const headers = headersConfig(getState);
    const body = JSON.stringify(userData);

    fetch('/api/user', {
        method: 'POST',
        headers,
        body
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getErrors(data.message, res.status, REGISTER_FAIL));
            dispatch({ type: REGISTER_FAIL });
        });

        res.json().then(data => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: data
            });
            dispatch(clearErrors());
        });

    });

};

export const loadUser = () => (dispatch, getState) => {

    dispatch({ type: USER_LOADING });

    const headers = headersConfig(getState);

    fetch('/api/auth/user', {
        method: 'GET',
        headers
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getErrors(data.mesage, res.status, AUTH_ERROR));
            dispatch({ type: AUTH_ERROR });
        });

        res.json().then(data => dispatch({
            type: USER_LOADED,
            payload: data
        }));

    });

};

export const logIn = userData => (dispatch, getState) => {

    const headers = headersConfig(getState);
    const body = JSON.stringify(userData);

    fetch('/api/auth', {
        method: 'POST',
        headers,
        body
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getErrors(data.message, res.status, LOGIN_FAIL));
            dispatch({ type: LOGIN_FAIL });
        });

        res.json().then(data => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            dispatch(fetchTodos());
            dispatch(clearErrors());
        });

    });

};

export const logOut = () => dispatch => {
    dispatch(eraseTodos());
    dispatch({ type: LOGOUT_SUCCESS });
};

export const deleteUser = userId => (dispatch, getState) => {

    dispatch(deleteTodos(userId));
    dispatch(eraseTodos());

    const headers = headersConfig(getState);
    
    fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        headers
    })
    .then(res => {

        if(!res.ok) return res.json(data => {
            dispatch(getErrors(data.message, res.status, DELETE_USER_FAIL));
            dispatch({ type: DELETE_USER_FAIL });
        });

        res.json().then(deletedUser => {
            dispatch({ type: DELETE_USER_SUCCESS });
            console.log('Deleted user:', deletedUser);
        });

    });

};