import React, { useState } from 'react';
import { signUpUser, getTokenForUser } from './Utils.js'
import { moodForm } from './components/MoodForm.js'
import { scaleEditor } from './components/ScaleEditor'
import { loginForm } from './components/LoginForm.js'

const App = () => {
  //not logged in by default
  const { loggedIn, setLoggedIn } = useState(false);
  const { appUser, setAppUser } = useState({username: "", id: -1});

  const logout = () => {
    localStorage.removeItem('usertoken');
    setLoggedIn(false);
    setAppUser({username: "", id: -1});
  }

  const logUserIn = (resJson) => {
    localStorage.setItem('usertoken', resJson.token);
    setLoggedIn(true);
    //setAppUser here - still testing recieving id back as well as username
  }

  const handleLogin = (userData) => {
    getTokenForUser(userData)
    .then( resJson => {
      logUserIn(resJson);
    })
    .catch(err => console.log(err));
  }

  const handleSignup = (userData) => {
    signUpUser(userData)
    .then( resJson => {
      logUserIn(resJson);
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      {loginForm()}
    </div>
  );
}

export default App;