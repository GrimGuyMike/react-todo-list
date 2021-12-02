import {
    FETCH_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    TODOS_LOADING,
    ERASE_TODOS
} from "../actions/types";
import sortTodos from "../utils/sortTodos";

const initialState = {
    todos: [],
    loading: false
};

const todoReducer = function(state=initialState, action){
    switch(action.type){
        default:
            return { ...state };

        case TODOS_LOADING:
            return {
                ...state,
                loading: true
            };

        case FETCH_TODOS: {
            return {
                todos: sortTodos(action.payload),
                loading: false
            };
        }

        case ADD_TODO: {
            state.todos.push(action.payload);

            return {
                ...state,
                todos: sortTodos(state.todos)
            };
        };

        case REMOVE_TODO: {
            const removedId = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== removedId);

            return { ...state };
        };

        case TOGGLE_TODO: {
            const toggleId = action.payload.id;
            state.todos = state.todos.map(todo => (
                todo.id === toggleId ?
                { ...todo, done: !todo.done } :
                todo
            ));

            return {
                ...state,
                todos: sortTodos(state.todos)
            };
        };

        case ERASE_TODOS:
            return {
                ...state,
                todos: []
            };
    }
};

export default todoReducer;