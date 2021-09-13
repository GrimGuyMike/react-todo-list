import { FaTimes } from 'react-icons/fa';

const Todo = ({ todo, onCompletionToggle, onRemove }) => {
    return (
        <div className={`todo ${todo.done && 'done'}`} onDoubleClick={onCompletionToggle}>
            <h3>{todo.text}</h3>
            <FaTimes style={{ color: 'brown' }} onClick={onRemove} className='btn-remove-task' />
        </div>
    );
};

export default Todo;