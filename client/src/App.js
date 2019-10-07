import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { signUpUser, getTokenForUser, getLoggedInUser } from './Utils.js'
import { moodForm } from './components/MoodForm.js'
import { scaleEditor } from './components/ScaleEditor.js'
import { loginForm } from './components/LoginForm.js'

//testData is user, scales and scale items
const testData = {
  id: 1,
  username: "someone@something.com",
  moodScales: [
    {
      scaleName: "Happiness",
      scaleType: "text",
      scaleItems: [
        {
          index: 0,
          alias: "1"
        },
        {
          index: 1,
          alias: "2"
        }
      ],
    },
    {
      scaleName: "Gumption",
      scaleType: "text",
      scaleItems: [
        {
          index: 0,
          alias: "1"
        },
        {
          index: 1,
          alias: "2"
        },
        {
          index: 2,
          alias: "3"
        }
      ]
    }
  ]
}

const App = () => {
  //not logged in by default
  const { loggedIn, setLoggedIn } = useState(false);
  const { appUser, setAppUser } = useState({username: "", id: -1});

  //try to get user on new load
  useEffect( () => {
    // if no token, stay at default
    if (!localStorage.getItem('usertoken'))
      return;
    else {
      getLoggedInUser(localStorage.getItem('usertoken'))
      //then other user-related things
    }
  }, []);

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
    <div className="app">
      <header></header>
      <main>
        <Switch>
          {/* <Route path="/" component={userHome}/> */}
          <Route path="/addentry" component={moodForm} />
          <Route path="/editscales" component={scaleEditor} />
          <Route path="/" component={loginForm} />
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;