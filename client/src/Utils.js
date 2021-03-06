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

const formReducer = (state, {key, value, index, prop}) => {
    const newState = {...state};
    if (index && prop)
        newState[key][index][prop] = value;
    else 
        newState[key] = value;
    return newState;
};

const processResponse = res => {
    if (res.ok)
        return res.json();
    else
        throw new Error("Network response not ok");
}

const colorSquare = (alias) => {
    const style = {backgroundColor: alias, width: "50px", height: "50px", display: "inline-block", margin: "10px"}
    return (<div style={style}></div>)
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
    .then(processResponse);

const getTokenForUser = (user) =>
    fetch('/token-auth/',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
    )
    .then(processResponse)

const getLoggedInUser = (token) =>
    fetch('/api/currentuserdata/', {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
    .then(processResponse);

const getMoodLogs = (token) => 
    fetch('/api/moodloglist/', {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
    .then(processResponse);

const sendNewLog = (moodLog, token) =>
    fetch('/api/moodlogs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
        body: JSON.stringify(moodLog)
    })
    .then(processResponse);

const sendNewScale = (moodScale, token) =>
    fetch('/api/moodscales/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
        body: JSON.stringify(moodScale)
    })
    .then(processResponse);

const sendUpdatedScale = (moodScale, token) =>
    fetch(`/api/moodscales/${moodScale.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
        body: JSON.stringify(moodScale)
    })
    .then(processResponse);

export {
    colorSquare,
    formReducer,
    getLoggedInUser,
    getMoodLogs,
    getTokenForUser,
    useInput,
    sendNewLog,
    sendNewScale,
    sendUpdatedScale,
    signUpUser,
};