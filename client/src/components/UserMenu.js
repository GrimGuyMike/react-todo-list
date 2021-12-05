import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logOut } from "../state/actions/authActions";

const UserMenu = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = e => {
        if(!ref.current.contains(e.target)) setOpen(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div id='user-menu' className={open ? 'open' : null} ref={ref}>
            <div
                className="name"
                onClick={() => setOpen(open => !open)}
            >{user.name}</div>

            <div
                className="log-out"
                onClick={() => dispatch(logOut())}
            >Log Out</div>

            <div
                className="delete"
                onClick={() => dispatch(deleteUser(user.id))}
            >Delete User</div>
        </div>
    );
}

export default UserMenu;