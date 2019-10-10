import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { signUpUser, getTokenForUser, getLoggedInUser } from './Utils.js'
import { MoodForm } from './components/MoodForm.js'
import { ScaleEditor } from './components/ScaleEditor.js'
import { LoginForm } from './components/LoginForm.js'
import { UserHome } from './components/UserHome.js'

//testData is user, scales and scale items
const testData = {
  id: 1,
  username: "someone@something.com",
  moodScales: [
    {
      id: 0,
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
      id: 1,
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
      getLoggedInUser(localStorage.getItem('usertoken')).then(result => console.log(result))
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
          <Route path="/addentry" render={() => <MoodForm moodScales={testData.moodScales} />} />
          <Route path="/editscales" render={() => <ScaleEditor moodScales={testData.moodScales} />} />
          <Route path="/home" component={UserHome}/>
          <Route path="/" render={() => <LoginForm handleLogin={handleLogin} />} />
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;