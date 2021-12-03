import { TODOS } from "../actions/types";
import sortTodos from "../utils/sortTodos";

const initialState = {
    todos: [],
    loading: false
};

const todoReducer = function(state=initialState, action){
    switch(action.type){
        default:
            return { ...state };

        case TODOS.LOADING:
            return {
                ...state,
                loading: true
            };

        case TODOS.FETCH: {
            return {
                todos: sortTodos(action.payload),
                loading: false
            };
        }

        case TODOS.ADD: {
            state.todos.push(action.payload);

            return {
                ...state,
                todos: sortTodos(state.todos)
            };
        };

        case TODOS.REMOVE: {
            const removedId = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== removedId);

            return { ...state };
        };

        case TODOS.TOGGLE: {
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

        case TODOS.ERASE:
            return {
                ...state,
                todos: []
            };
    }
};

export default todoReducer;