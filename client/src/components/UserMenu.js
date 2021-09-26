import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logOut } from "../state/actions/authActions";

const UserMenu = () => {

    const dispatch = useDispatch();

    const id = useSelector(state => state.auth.user?._id.toString());
    const name = useSelector(state => state.auth.user?.name);

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = e => {
        if(!ref.current.contains(e.target)) setOpen(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleMenu = () => setOpen(open => !open);
    const doLogOut = e => {
        e.stopPropagation();
        dispatch(logOut());
    };
    const doDelete = e => {
        e.stopPropagation();
        dispatch(deleteUser(id));
    };

    return (
        <div id='user-menu' className={open ? 'open' : null} ref={ref}>
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