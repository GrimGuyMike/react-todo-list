import {
    FETCH_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    TODOS_LOADING,
    ERASE_TODOS,
    DELETE_TODOS
} from "./types";
import { headersConfig } from "./authActions";

export const fetchTodos = () => async (dispatch, getState) => {
    dispatch({ type: TODOS_LOADING });

    const headers = headersConfig(getState);

    const res = await fetch("/api/todo", {
        method: 'GET',
        headers
    });

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

    const data = await res.json();
    dispatch({
        type: ADD_TODO,
        payload: data
    });
};

export const removeTodo = todoId => async (dispatch, getState) => {
    const headers = headersConfig(getState);

    await fetch(`/api/todo/${todoId}`, {
        method: 'DELETE',
        headers
    });

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

    const data = await res.json();
    dispatch({
        type: TOGGLE_TODO,
        payload: data
    });
};

export const eraseTodos = () => ({ type: ERASE_TODOS });