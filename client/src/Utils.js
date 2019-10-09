import React, { useState } from 'react';

// custom hook for monitoring change in forms
const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        inputProps: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};

const formReducer = (state, action) => {
    state[action.key] = action.value;
    return state;
}

//shared ajax methods
const signUpUser = (user) =>
    fetch('/api/users/',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
    )
    .then(res => res.json());

const getTokenForUser = (user) =>
    fetch('/token-auth/',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
    )
    .then(res => res.json());

const getLoggedInUser = (token) =>
    fetch('/api/currentuserdata/', {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
    .then(res => res.json());

export {
    formReducer,
    getLoggedInUser,
    getTokenForUser,
    useInput,
    signUpUser,
};