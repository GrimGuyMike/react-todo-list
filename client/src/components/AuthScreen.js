import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "../state/actions/errorActions";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthScreen = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signUp, setSignUp] = useState(false);

    const onClick = e => {
        if(e.target.classList.contains('active')) return;

        document
        .querySelectorAll('#sign-form > .btns > div')
        .forEach(btn => btn.classList.remove('active'));

        setName('');
        setEmail('');
        setPassword('');

        dispatch(clearErrors());

        const className = e.target.classList[0];
        
        document
        .querySelectorAll(`#sign-form *.${className}`)
        .forEach(el => el.classList.add('active'));

        setSignUp(signUp => !signUp);
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

            {
                signUp ?
                <SignUpForm
                    name={name} setName={setName}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                /> :
                <SignInForm
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                />
            }
        </div>
    );
};

export default AuthScreen;