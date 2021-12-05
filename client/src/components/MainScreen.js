import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "../state/actions/errorActions";
import { eraseTodos } from "../state/actions/todoActions";
import TodoForm from "./TodoForm";
import Todos from "./Todos";

const MainScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrors());

        return () => {
            dispatch(eraseTodos());
            dispatch(clearErrors());
        };
    }, []);

    return (
        <div id="main-screen">
            <Todos />

            <TodoForm />
        </div>
    );
};

export default MainScreen;