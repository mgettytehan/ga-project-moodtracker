import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
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
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userData, setUserData ] = useState({username: "", id: -1, moodScales: []});

  //try to get user on new load
  useEffect( () => {
    const userToken = localStorage.getItem('usertoken');
    // if no token, stay at default logged out state
    if (!userToken)
      return;
    else
      getLoggedInUser(userToken)
      .then(setUserData)
      .then(() => setLoggedIn(true))
      .catch(err => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem('usertoken');
    setLoggedIn(false);
    setUserData({username: "", id: -1, moodScales: []});
  }

  const logUserIn = (userToken) => {
    localStorage.setItem('usertoken', userToken);
    setLoggedIn(true);
  }

  const handleLogin = (userData) => {
    getTokenForUser(userData)
    .then( resJson => {
      logUserIn(resJson.token);
    })
    .catch(err => console.log(err));
  }

  const handleSignUp = ({username, password}) => {
    signUpUser({username, password})
    .then(logUserIn)
    .catch(err => console.log(err));
  }

  return (
    <div className="app">
      <header>{loggedIn ? <button onClick={logout}>Logout</button> : ""}</header>
      <main>
        <Switch>
          {loggedIn ? (
          <>
            <Route path="/addentry">
              <MoodForm moodScales={testData.moodScales} />
            </Route>
            <Route path="/editscales">
              <ScaleEditor moodScales={testData.moodScales} />
            </Route>
            <Route path="/home">
              <UserHome />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </>
          ) : (
          <Route path="/">
              <LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp}/>
          </Route>
          )}
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;