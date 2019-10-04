import React, { useState } from 'react';
import { signUpUser } from './Utils.js'
import { moodForm } from './components/MoodForm.js'
import { scaleEditor } from './components/ScaleEditor'
import { loginForm } from './components/LoginForm.js'

const App = () => {
  //not logged in by default
  const { loggedIn, setLoggedIn } = useState(false);
  const { appUser, setAppUser } = useState({username: "", id: -1});

  const handleLogin = () => {

  }

  const handleSignup = (userData) => {
    signUpUser(userData)
    .then( resJson => {
      localStorage.setItem('usertoken', resJson.token);
      setLoggedIn(true);
      setAppUser()
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