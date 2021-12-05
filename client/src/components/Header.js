import UserMenu from "./UserMenu";

const Header = ({ authenticated }) => {
    return (
        <header>
            <span id="logo">ToDo List</span>
            {authenticated && <UserMenu />}
        </header>
    );
};

export default Header;