import React from 'react';

const signUp = () => {
    return (
        <form>
            <label>Email:</label>
            <input type="email" name="email" />
            <label>Username:</label>
            <input type="text" name="username" />
            <label>Password:</label>
            <input type="password" name="password" />
            <label>Confirm:</label>
            <input type="password" name="confirmPassword" />
        </form>
    );
}

const login = () => {
    return (
        <form>
            <label>Email:</label>
            <input type="email" name="email" />
            <label>Password:</label>
            <input type="password" name="password" />
        </form>
    );
}

const loginForm = () => {
    return (
        <div>
            <p>Login</p>
            {login()}
            {signUp()}
            <p>Sign up?</p>
        </div>
    );
}

export { loginForm };