import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../../state/actions/todoActions";
import Todo from "./Todo";

const Todos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const todos = useSelector(state => state.todos.todos);

    return (
        <div className="todos">
            {
                todos.length ?
                todos.map((todo, idx) => (
                    <Todo todo={todo} key={idx}/>
                )) :
                <h1 className='empty-msg'>The list is empty!</h1>
            }
        </div>
    );
};

export default Todos;