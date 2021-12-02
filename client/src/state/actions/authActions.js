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
    DELETE_USER_FAIL,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
} from "./types";
import { getErrors, clearErrors } from "./errorActions";
import { fetchTodos, eraseTodos } from "./todoActions";
import headersConfig from "../utils/headersConfig";

export const register = userData => async (dispatch, getState) => {
    const headers = headersConfig(getState);
    const body = JSON.stringify(userData);

    const res = await fetch('/api/signup', {
        method: 'POST',
        headers,
        body
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, REGISTER_FAIL));
        dispatch({ type: REGISTER_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: REGISTER_SUCCESS,
        payload: data
    });
    dispatch(clearErrors());
};

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const headers = headersConfig(getState);

    const res = await fetch('/api/user', {
        method: 'GET',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, AUTH_ERROR));
        dispatch({ type: AUTH_ERROR });
        return;
    }

    const data = await res.json();
    dispatch({
        type: USER_LOADED,
        payload: data
    });
};

export const logIn = userData => async (dispatch, getState) => {
    const headers = headersConfig(getState);
    const body = JSON.stringify(userData);

    const res = await fetch('/api/signin', {
        method: 'POST',
        headers,
        body
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, LOGIN_FAIL));
        dispatch({ type: LOGIN_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    });
    dispatch(fetchTodos());
    dispatch(clearErrors());
};

export const logOut = () => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    await fetch('/api/logout', {
        method: 'POST',
        headers
    });

    dispatch(eraseTodos());
    dispatch({ type: LOGOUT_SUCCESS });
};

export const deleteUser = () => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch('/api/user', {
        method: 'DELETE',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, DELETE_USER_FAIL));
        dispatch({ type: DELETE_USER_FAIL });
        return;
    }

    dispatch(eraseTodos());
    dispatch({ type: DELETE_USER_SUCCESS });
};

export const refresh = () => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch('/api/refresh', {
        method: 'POST',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, REFRESH_FAIL));
        dispatch({ type: REFRESH_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: REFRESH_SUCCESS,
        payload: data
    });
};