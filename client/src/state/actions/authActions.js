import { AUTH } from "./types";
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
        dispatch(getErrors(data.message, res.status, AUTH.REGISTER_FAIL));
        dispatch({ type: AUTH.REGISTER_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: AUTH.REGISTER,
        payload: data
    });
    dispatch(clearErrors());
};

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: AUTH.USER_LOADING });

    const headers = headersConfig(getState);

    const res = await fetch('/api/user', {
        method: 'GET',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, AUTH.LOAD_USER_FAIL));
        dispatch({ type: AUTH.LOAD_USER_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: AUTH.LOAD_USER,
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
        dispatch(getErrors(data.message, res.status, AUTH.LOGIN_FAIL));
        dispatch({ type: AUTH.LOGIN_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: AUTH.LOGIN,
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
    dispatch({ type: AUTH.LOGOUT });
};

export const deleteUser = () => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch('/api/user', {
        method: 'DELETE',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, AUTH.DELETE_USER_FAIL));
        dispatch({ type: AUTH.DELETE_USER_FAIL });
        return;
    }

    dispatch(eraseTodos());
    dispatch({ type: AUTH.DELETE_USER });
};

export const refresh = () => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch('/api/refresh', {
        method: 'POST',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, AUTH.REFRESH_FAIL));
        dispatch({ type: AUTH.REFRESH_FAIL });
        return;
    }

    const data = await res.json();
    dispatch({
        type: AUTH.REFRESH,
        payload: data
    });
};