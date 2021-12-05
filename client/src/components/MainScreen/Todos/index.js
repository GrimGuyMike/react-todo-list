import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../../state/actions/todoActions";
import StatusMessage from "../../StatusMessage";
import Todo from "./Todo";

const Todos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const {loading, todos} = useSelector(state => state.todos);

    return (
        <div className="todos">
            {
                loading ?
                <StatusMessage text='Loading...'/> :
                (
                    todos.length ?
                    todos.map((todo, idx) => (
                        <Todo todo={todo} key={idx}/>
                    )) :
                    <StatusMessage text='The list is empty!'/>
                )
            }
        </div>
    );
};

export default Todos;