import React, { useReducer, useState } from 'react';
import { formReducer } from '../Utils';

const LoginForm = (props) => {
    const [userValues, setUserValues] = useReducer(formReducer, {});
    //true for login screen, false for signup
    const [loginToggle, setLoginToggle] = useState(true);
    //for login/sign-up failures
    const [sendFailed, setSendFailed] = useState(false);

    const handleChange = evnt => setUserValues({ key: evnt.target.name, value: evnt.target.value });
    const handleSubmit = evnt => {
        evnt.preventDefault();
        try {
            loginToggle ? props.handleLogin(userValues) : props.handleSignUp(userValues);
            setSendFailed(true);
        }
        catch (e) {
            console.log(e);
            setSendFailed(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{loginToggle ? "Login" : "Sign Up"}</h2>
            <label>Email</label>
            <input type="email" name="username" onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
            {loginToggle ?
                (<div className="button-container"><input type="submit" value="Login" /></div>) :
                (<><label>Confirm</label>
                <input type="password" name="confirmPassword" onChange={handleChange} required />
                <div className="button-container"><input type="submit" value="Sign Up" disabled={!(userValues.password === userValues.confirmPassword)} /></div></>)
            }
            <p className="warning-text">{sendFailed ? (loginToggle ? "login has failed" : "sign-up has failed") : ""}</p>
            <p className="clickable" onClick={() => {setLoginToggle(!loginToggle); setSendFailed(false);}}>
                {loginToggle ? "Sign Up" : "Login"}
            </p>
        </form>
    );
}

export { LoginForm };