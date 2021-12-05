import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../../../state/actions/todoActions";

const Todo = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <div className={`todo ${todo.done ? 'done' : ''}`}>
            <div
                className='checkbox'
                onClick={() => dispatch(toggleTodo(todo))}
            ></div>
            <span className='text'>{todo.text}</span>
            <span
                className='delete'
                onClick={() => dispatch(removeTodo(todo.id))}
            >&times;</span>
        </div>
    );
};

export default Todo;