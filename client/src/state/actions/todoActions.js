import {
    FETCH_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    TODOS_LOADING,
    ERASE_TODOS,
    FETCH_TODOS_FAIL,
    ADD_TODO_FAIL,
    REMOVE_TODO_FAIL,
    TOGGLE_TODO_FAIL
} from "./types";
import headersConfig from "./utils/headersConfig";
import { getErrors } from "./errorActions";

export const fetchTodos = () => async (dispatch, getState) => {
    dispatch({ type: TODOS_LOADING });

    const headers = headersConfig(getState);

    const res = await fetch("/api/todo", {
        method: 'GET',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, FETCH_TODOS_FAIL));
        return;
    }

    const data = await res.json();
    dispatch({
        type: FETCH_TODOS,
        payload: data
    });
};

export const addTodo = text => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch("/api/todo", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            text
        })
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, ADD_TODO_FAIL));
        return;
    }

    const data = await res.json();
    dispatch({
        type: ADD_TODO,
        payload: data
    });
};

export const removeTodo = todoId => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch(`/api/todo/${todoId}`, {
        method: 'DELETE',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, REMOVE_TODO_FAIL));
        return;
    }

    dispatch({
        type: REMOVE_TODO,
        payload: todoId
    });
};

export const toggleTodo = todo => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    const res = await fetch(`/api/todo/${todo.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ done: !todo.done })
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, TOGGLE_TODO_FAIL));
        return;
    }

    const data = await res.json();
    dispatch({
        type: TOGGLE_TODO,
        payload: data
    });
};

export const eraseTodos = () => ({ type: ERASE_TODOS });