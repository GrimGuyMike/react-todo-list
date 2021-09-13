import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, deleteUser } from "../../state/actions/authActions";


const LogOut = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState(false);

    function toggle() {
        setOpen(!open);
        setQuestion(false);
    };
    
    function onLogOut() {
        dispatch(logOut());
    };

    function onDelete() {

        if(!question) {
            setQuestion(true);
        } else {
            dispatch(deleteUser(user.id));
        }

    };

    return (
        <div className='auth-div'>
            <button className='auth-toggle' onClick={toggle}>
                <strong>{user.name}</strong>
            </button>

            {
                open &&

                <div className='logout-btns'>

                    <button
                        onClick={onLogOut}
                    >
                        Log out
                    </button>

                    <button
                        onClick={onDelete}
                        id='delete-user'
                    >
                        {
                            question ?
                            "Yes, I'm sure!" :
                            "Delete user"
                        }
                    </button>

                </div>

            }
        </div>
    );

};

export default LogOut;