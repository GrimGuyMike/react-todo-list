import { AUTH } from "./types";
import { getErrors, clearErrors } from "./errorActions";
import { fetchTodos, eraseTodos } from "./todoActions";
import authService from '../services/auth';

export const register = userData => async dispatch => {
    const res = await authService.register(userData);

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, AUTH.REGISTER_FAIL));
        dispatch({ type: AUTH.REGISTER_FAIL });
        return;
    }

    dispatch({
        type: AUTH.REGISTER,
        payload: res.data
    });
    dispatch(clearErrors());
};

export const loadUser = () => async dispatch => {
    dispatch({ type: AUTH.USER_LOADING });

    const res = await authService.loadUser();

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, AUTH.LOAD_USER_FAIL));
        dispatch({ type: AUTH.LOAD_USER_FAIL });
        return;
    }

    dispatch({
        type: AUTH.LOAD_USER,
        payload: res.data
    });
};

export const logIn = userData => async dispatch => {
    const res = await authService.login(userData);

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, AUTH.LOGIN_FAIL));
        dispatch({ type: AUTH.LOGIN_FAIL });
        return;
    }

    dispatch({
        type: AUTH.LOGIN,
        payload: res.data
    });
    dispatch(fetchTodos());
    dispatch(clearErrors());
};

export const logOut = () => async dispatch => {
    await authService.logout();

    dispatch(eraseTodos());
    dispatch({ type: AUTH.LOGOUT });
};

export const deleteUser = () => async dispatch => {
    const res = await authService.deleteUser();

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, AUTH.DELETE_USER_FAIL));
        dispatch({ type: AUTH.DELETE_USER_FAIL });
        return;
    }

    dispatch(eraseTodos());
    dispatch({ type: AUTH.DELETE_USER });
};

export const refresh = token => dispatch => {
    dispatch({
        type: AUTH.REFRESH,
        payload: token
    });
};