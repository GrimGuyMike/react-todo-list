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

export const fetchTodos = () => (dispatch, getState) => {

    dispatch({ type: TODOS_LOADING });

    const headers = headersConfig(getState);

    fetch("/api/todo", {
        method: 'GET',
        headers
    })
    .then(res => res.json())
    .then(todos => dispatch(
        {
            type: FETCH_TODOS,
            payload: todos
        }
    ));

};

export const addTodo = text => (dispatch, getState) => {

    const headers = headersConfig(getState);

    fetch("/api/todo", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            text,
            userId: getState().auth.user.id
        })
    })
    .then(res => res.json())
    .then(todo => dispatch({
        type: ADD_TODO,
        payload: todo
    }));

};

export const removeTodo = todoId => (dispatch, getState) => {

    const headers = headersConfig(getState);

    fetch(`/api/todo/${todoId}`, {
        method: 'DELETE',
        headers
    })
    .then(res => res.json())
    .then(deleted => dispatch({
        type: REMOVE_TODO,
        payload: deleted
    }));

};

export const toggleTodo = todo => (dispatch, getState) => {

    const headers = headersConfig(getState);

    fetch(`/api/todo/${todo._id.toString()}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ done: !todo.done })
    })
    .then(res => res.json())
    .then(updated => dispatch({
        type: TOGGLE_TODO,
        payload: updated
    }));
    
};

export const eraseTodos = () => ({ type: ERASE_TODOS });

export const deleteTodos = userId => (dispatch, getState) => {

    const headers = headersConfig(getState);

    fetch(`/api/todo/deletemany/${userId}`, {
        method: 'DELETE',
        headers
    })
    .then(res => res.json())
    .then(data => dispatch({ type: DELETE_TODOS }));

};