import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../state/actions/todoActions";

const AddTodo = () => {

    const dispatch = useDispatch();

    const [text, setText] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        dispatch(addTodo(text));
        setText('');
    };

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <input type="text"
                   required
                   placeholder='Task description'
                   value={text}
                   className='task-description'
                   onChange={e => setText(e.target.value)} />
            <input type="submit" value='Add' className='btn-submit' />
        </form>
    );

};

export default AddTodo;