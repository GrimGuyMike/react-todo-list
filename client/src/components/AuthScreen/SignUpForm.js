import { useDispatch } from "react-redux";
import { register } from "../../state/actions/authActions";

const SignUpForm = ({ name, setName, email, setEmail, password, setPassword }) => {
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        dispatch(register({
            name,
            email,
            password
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">User name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder='User name'
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>

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
            
            <input type="submit" value='Sign Up' />
        </form>
    );
};

export default SignUpForm;