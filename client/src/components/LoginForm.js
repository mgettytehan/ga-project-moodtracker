import React, { useReducer, useState } from 'react';
import { formReducer } from '../Utils';

const LoginForm = (props) => {
    const [userValues, setUserValues] = useReducer(formReducer, {});
    //true for login screen, false for signup
    const [loginToggle, setLoginToggle] = useState(true);

    const handleChange = evnt => setUserValues({ key: evnt.target.name, value: evnt.target.value });

    return (
        <form onSubmit={evnt => {
            evnt.preventDefault();
            if (loginToggle)
                props.handleLogin(userValues);
            else {

                props.handleSignUp(userValues);
            }
        }}>
            <h2>{loginToggle ? "Login" : "Sign Up"}</h2>
            <label>Email:</label>
            <input type="email" name="username" onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
            {loginToggle ?
                (<input type="submit" value="Login" />) :
                (<><label>Confirm:</label>
                <input type="password" name="confirmPassword" onChange={handleChange} required />
                <input type="submit" value="Sign Up" disabled={!(userValues.password === userValues.confirmPassword)} /></>)
            }
            <p onClick={() => setLoginToggle(!loginToggle)}>
                {loginToggle ? "Sign Up" : "Login"}
            </p>
        </form>
    );
}

export { LoginForm };