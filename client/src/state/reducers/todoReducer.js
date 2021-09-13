import { FETCH_TODOS, ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TODOS_LOADING, ERASE_TODOS } from "../actions/types";

const initialState = {
    todos: [],
    loading: false
};

const todoReducer = function(state=initialState, action){

    switch(action.type){

        default:
            return state;

        case TODOS_LOADING:
            return {
                ...state,
                loading: true
            };

        case FETCH_TODOS:
            return {
                todos: action.payload,
                loading: false
            };

        case ADD_TODO: {

            const newTodo = action.payload;
            let done = state.todos.filter(todo => todo.done);
            let undone = state.todos.filter(todo => !todo.done);
            
            done = done.sort((a, b) => {
                let aTime = (new Date(a.date)).getTime();
                let bTime = (new Date(b.date)).getTime();
                return bTime - aTime;
            });

            undone = undone.sort((a, b) => {
                let aTime = (new Date(a.date)).getTime();
                let bTime = (new Date(b.date)).getTime();
                return bTime - aTime;
            });

            return {
                ...state,
                todos: [newTodo, ...undone, ...done]
            };

        };

        case REMOVE_TODO: {
            const { removedId } = action.payload;
            state.todos = state.todos.filter(todo => todo._id.toString() !== removedId);
            return state;
        };

        case TOGGLE_TODO: {

            const { toggleId } = action.payload;

            state.todos = state.todos.map(todo => (
                todo._id.toString() === toggleId ?
                { ...todo, done: !todo.done } :
                todo
            ));

            let done = state.todos.filter(todo => todo.done);
            let undone = state.todos.filter(todo => !todo.done);
            
            done = done.sort((a, b) => {
                let aTime = (new Date(a.date)).getTime();
                let bTime = (new Date(b.date)).getTime();
                return bTime - aTime;
            });

            undone = undone.sort((a, b) => {
                let aTime = (new Date(a.date)).getTime();
                let bTime = (new Date(b.date)).getTime();
                return bTime - aTime;
            });

            return {
                ...state,
                todos: [...undone, ...done]
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