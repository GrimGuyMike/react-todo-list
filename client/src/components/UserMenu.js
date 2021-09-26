import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logOut } from "../state/actions/authActions";

const UserMenu = () => {

    const dispatch = useDispatch();

    const id = useSelector(state => state.auth.user?._id.toString());
    const name = useSelector(state => state.auth.user?.name);

    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(open => !open);

    const doLogOut = () => dispatch(logOut());

    const doDelete = () => dispatch(deleteUser(id));

    return (
        <div id='user-menu' className={open ? 'open' : null}>
            <div
                className="name"
                onClick={toggleMenu}
            >{name && name}</div>

            <div
                className="log-out"
                onClick={doLogOut}
            >Log Out</div>

            <div
                className="delete"
                onClick={doDelete}
            >Delete User</div>
        </div>
    );

}

export default UserMenu;