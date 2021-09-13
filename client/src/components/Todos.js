import Todo from "./Todo";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, toggleTodo, removeTodo } from "../state/actions/todoActions";

const Todos = () => {

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);
    const loading = useSelector(state => state.todos.loading);
    
    useEffect(() => dispatch(fetchTodos()), [dispatch]);

    function onCompletionToggle(todo) {
        dispatch(toggleTodo(todo));
    };

    function onRemove(id) {
        dispatch(removeTodo(id));
    }

    return (
        <div className='todos'>
            {
                todos.length ?
                todos.map(todo => ( <Todo key={todo._id.toString()}
                                        todo={todo}
                                        onCompletionToggle={() => onCompletionToggle(todo)}
                                        onRemove={() => onRemove(todo._id.toString())} /> )) :
                (
                    loading ?
                    <h2 className='warning'>Loading...</h2> :
                    <h2 className='warning'>The list is empty!</h2>
                )
            }
        </div>
    );

};

export default Todos;