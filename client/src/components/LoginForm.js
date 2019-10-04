import React from 'react';
import { useInput } from '../Utils';

const SignUp = () => {
    const { value: email, inputProps: emailProps } = useInput("");
    const { value: username, inputProps: userProps } = useInput("");
    const { value: password, inputProps: passwordProps } = useInput("");
    const { value: confirm, inputProps: confirmProps } = useInput("");

    return (
        <form>
            <label>Email:</label>
            <input type="email" {...emailProps} />
            <label>Username:</label>
            <input type="text" {...userProps} />
            <label>Password:</label>
            <input type="password" {...passwordProps} />
            <label>Confirm:</label>
            <input type="password" {...confirmProps} />
        </form>
    );
}

const Login = () => {
    const { value: email, inputProps: emailProps } = useInput("");
    const { value: password, inputProps: passwordProps } = useInput("");
    return (
        <form>
            <label>Email:</label>
            <input type="email" {...emailProps} />
            <label>Password:</label>
            <input type="password" {...passwordProps} />
        </form>
    );
}

const loginForm = () => {
    return (
        <div>
            <p>Login</p>
            <Login />
            <SignUp />
            <p>Sign up?</p>
        </div>
    );
}

export { loginForm };