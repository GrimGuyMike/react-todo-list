import { TODOS } from "./types";
import headersConfig from "../utils/headersConfig";
import { getErrors } from "./errorActions";

export const fetchTodos = () => async (dispatch, getState) => {
    dispatch({ type: TODOS.LOADING });

    const headers = headersConfig(getState);

    const res = await fetch("/api/todo", {
        method: 'GET',
        headers
    });

    if(!res.ok) {
        const data = await res.json();
        dispatch(getErrors(data.message, res.status, TODOS.FETCH_FAIL));
        return;
    }

    const data = await res.json();
    dispatch({
        type: TODOS.FETCH,
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
        dispatch(getErrors(data.message, res.status, TODOS.ADD_FAIL));
        return;
    }

    const data = await res.json();
    dispatch({
        type: TODOS.ADD,
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
        dispatch(getErrors(data.message, res.status, TODOS.REMOVE_FAIL));
        return;
    }

    dispatch({
        type: TODOS.REMOVE,
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
        dispatch(getErrors(data.message, res.status, TODOS.TOGGLE_FAIL));
        return;
    }

    const data = await res.json();
    dispatch({
        type: TODOS.TOGGLE,
        payload: data
    });
};

export const eraseTodos = () => ({ type: TODOS.ERASE });