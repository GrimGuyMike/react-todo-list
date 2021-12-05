import { useDispatch } from "react-redux";
import { logIn } from "../state/actions/authActions";

const SignInForm = ({ email, setEmail, password, setPassword }) => {
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        dispatch(logIn({
            email,
            password
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="text"
                    name="email"
                    placeholder='E-mail'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
            </div>
            
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>
            
            <input type="submit" value='Sign In' />
        </form>
    );
};

export default SignInForm;