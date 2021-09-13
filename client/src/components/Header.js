import Button from "./Button";
import { useSelector } from "react-redux";

const Header = ({ formOpen, onFormToggle }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <header>
            <h1>ToDo List</h1>
            {
                isAuthenticated &&
                <Button text={formOpen ? 'Close' : 'Add'}
                    color={formOpen ? 'brown' : 'green'}
                    onClick={() => onFormToggle()} />
            }
        </header>
    );

};

export default Header;