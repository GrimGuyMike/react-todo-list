import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, register } from "../state/actions/authActions";
import { clearErrors } from "../state/actions/errorActions";

const SignForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClick = e => {
        if(e.target.classList.contains('active')) return;

        document
        .querySelectorAll('#sign-form > .btns > div')
        .forEach(btn => btn.classList.remove('active'));

        document
        .querySelectorAll('#sign-form > form')
        .forEach(tab => tab.classList.remove('active'));

        setName('');
        setEmail('');
        setPassword('');

        dispatch(clearErrors());

        const className = e.target.classList[0];
        
        document
        .querySelectorAll(`#sign-form *.${className}`)
        .forEach(el => el.classList.add('active'));
    };

    const onSubmit = e => {
        e.preventDefault();
        
        const formClass = e.target.classList[0];

        switch(formClass) {
            case 'in': {
                dispatch(logIn({
                    email,
                    password
                }))
                break;
            }
            case 'up': {
                dispatch(register({
                    name,
                    email,
                    password
                }))
                break;
            }
            default: return;
        }
    };

    return (
        <div id='sign-form'>
            <div className="btns">
                <div
                    className='in active'
                    onClick={onClick}
                >Sign In</div>
                <div
                    className='up'
                    onClick={onClick}
                >Sign Up</div>
            </div>

            <form className="in active" onSubmit={onSubmit}>
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

            <form className="up" onSubmit={onSubmit}>
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
        </div>
    );
};

export default SignForm;