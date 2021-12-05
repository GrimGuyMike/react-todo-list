import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../state/actions/todoActions";

const TodoForm = () => {
    const dispatch = useDispatch();

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

    useEffect(() => {
        window.addEventListener('click', handleClickOutsideForm);

        return () => window.removeEventListener('click', handleClickOutsideForm);
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        dispatch(addTodo(newTodo));
        setNewTodo('');
    };

    return (
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
    );
};

export default TodoForm;