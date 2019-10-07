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

const Login = (props) => {
    const { value: username, inputProps: usernameProps } = useInput("");
    const { value: password, inputProps: passwordProps } = useInput("");
    return (
        <form onSubmit={evnt => {
            evnt.preventDefault();
            props.handleLogin({ username, password }); 
        }}>
            <label>Email:</label>
            <input type="email" {...usernameProps} />
            <label>Password:</label>
            <input type="password" {...passwordProps} />
            <input type="submit" />
        </form>
    );
}

const loginForm = (handleLogin) => {
    return (
        <div>
            <p>Login</p>
            <Login handleLogin={handleLogin} />
            <SignUp />
            <p>Sign up?</p>
        </div>
    );
}

export { loginForm };