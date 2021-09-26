import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const Header = () => {
    
    const authenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <header>
            <span id="logo">ToDo List</span>
            {authenticated && <UserMenu />}
        </header>
    );

};

export default Header;