import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../state/actions/errorActions";
import { addTodo, eraseTodos, fetchTodos, removeTodo, toggleTodo } from "../state/actions/todoActions";

const MainScreen = () => {
    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos.todos);

    const [newTodo, setNewTodo] = useState('');

    const [formOpen, setFormOpen] = useState(false);
    const formRef = useRef(null);
    const formInputRef = useRef(null);

    const toggleForm = () => {
        if(!formOpen) {
            setNewTodo('');
            setFormOpen(true);
            formInputRef.current.focus();
            return;
        }
        setFormOpen(false);
    };

    const handleClickOutsideForm = e => {
        if(!formRef.current.contains(e.target)) setFormOpen(false);
    };

    const onSubmit = e => {
        e.preventDefault();
        dispatch(addTodo(newTodo));
        setNewTodo('');
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutsideForm);
        dispatch(clearErrors());
        dispatch(fetchTodos());

        return () => {
            window.removeEventListener('click', handleClickOutsideForm);
            dispatch(eraseTodos());
            dispatch(clearErrors());
        };
    }, []);

    return (
        <div id="main-screen">
            <div className="todos">
                {
                    todos.length ?
                    todos.map((todo, idx) => (
                        <div className={`todo ${todo.done ? 'done' : ''}`} key={idx}>
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
                    )) :
                    <h1 className='empty-msg'>The list is empty!</h1>
                }
            </div>

            <form
                    className={formOpen ? 'open' : ''}
                    onSubmit={onSubmit}
                    ref={formRef}
            >
                <input
                    type='text'
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    ref={formInputRef}
                />
                <span className='btn' onClick={toggleForm}>+</span>
            </form>
        </div>
    );
};

export default MainScreen;