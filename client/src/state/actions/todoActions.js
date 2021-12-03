import { TODOS } from "./types";
import { getErrors } from "./errorActions";
import todoService from '../services/todo';

export const fetchTodos = () => async dispatch => {
    dispatch({ type: TODOS.LOADING });

    const res = await todoService.fetch();

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, TODOS.FETCH_FAIL));
        return;
    }

    dispatch({
        type: TODOS.FETCH,
        payload: res.data
    });
};

export const addTodo = text => async dispatch => {
    const res = await todoService.add({ text });

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, TODOS.ADD_FAIL));
        return;
    }

    dispatch({
        type: TODOS.ADD,
        payload: res.data
    });
};

export const removeTodo = todoId => async dispatch => {
    const res = await todoService.remove(todoId);

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, TODOS.REMOVE_FAIL));
        return;
    }

    dispatch({
        type: TODOS.REMOVE,
        payload: todoId
    });
};

export const toggleTodo = todo => async dispatch => {
    const res = await todoService.toggle(todo.id, { done: !todo.done });

    if(!res.ok) {
        dispatch(getErrors(res.data.message, res.status, TODOS.TOGGLE_FAIL));
        return;
    }

    dispatch({
        type: TODOS.TOGGLE,
        payload: res.data
    });
};

export const eraseTodos = () => ({ type: TODOS.ERASE });