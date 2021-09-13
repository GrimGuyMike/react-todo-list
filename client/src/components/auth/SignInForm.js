import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, logIn } from "../../state/actions/authActions";
import { REGISTER_FAIL, LOGIN_FAIL } from "../../state/actions/types";
import { clearErrors } from "../../state/actions/errorActions";

const SignInForm = () => {

    const dispatch = useDispatch();

    const error = useSelector(state => state.error);

    const [open, setOpen] = useState(false);
    const [registration, setRegistration] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function toggleForm() {
        setOpen(!open);

        dispatch(clearErrors());
        setRegistration(false);
        setName('');
        setEmail('');
        setPassword('');
    };

    function onSubmit(e) {
        e.preventDefault();

        let userData;
        if(registration) {

            userData = {
                name,
                email,
                password
            };
            dispatch(register(userData));

        } else {

            userData = {
                email,
                password
            };
            dispatch(logIn(userData));

        }

    };

    return (
        <div className='auth-div'>
            <button onClick={toggleForm} className='auth-toggle'>
                Sign in
            </button>

            {
                (error.id === REGISTER_FAIL || error.id === LOGIN_FAIL) &&
                <div className='auth-error-warning'>
                    {error.message}
                </div>
            }

            {
                open &&
                <form className='auth-form' onSubmit={onSubmit}>

                    <div>
                        <input
                            type="checkbox"
                            name='new-user'
                            onChange={e => setRegistration(e.currentTarget.checked)}
                            checked={registration}
                        />
                        <label htmlFor="new-user">
                            New user
                        </label>
                    </div>

                    {
                        registration &&
                        <>
                            <label htmlFor="name">User name</label>
                            <input
                                type="text"
                                name='name'
                                placeholder='User name'
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </>
                    }
                    
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    
                    <input
                        type="submit"
                        value={registration ? 'Register' : 'Log in'}
                    />

                </form>
            }
        </div>
    );

};

export default SignInForm;