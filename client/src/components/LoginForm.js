import React, { useReducer, useState } from 'react';
import { formReducer } from '../Utils';

const Login = (props) => {
    const [userValues, setUserValues] = useReducer(formReducer, "");
    //true for login screen, false for signup
    const [loginToggle, setLoginToggle] = useState(true);

    const handleChange = evnt => setUserValues({ key: evnt.target.name, value: evnt.target.value });

    return (
        <form onSubmit={evnt => {
            evnt.preventDefault();
            props.handleLogin(userValues); 
        }}>
            <h2>{loginToggle ? "Login" : "Sign Up"}</h2>
            <label>Email:</label>
            <input type="email" name="username" onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
            {loginToggle ?
                (<input type="submit" value="Login" />) :
                (<><label>Confirm:</label>
                <input type="confirmPassword" name="password" onChange={handleChange} required />
                <input type="submit" value="Sign Up" /></>)
            }
            <p onClick={() => setLoginToggle(!loginToggle)}>
                {loginToggle ? "Sign Up" : "Login"}
            </p>
        </form>
    );
}

const loginForm = (handleLogin) => {
    return (
        <div>
            <Login handleLogin={handleLogin} />
        </div>
    );
}

export { loginForm };