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
  const [ appUser, setAppUser ] = useState({username: "", id: -1});

  //try to get user on new load
  useEffect( () => {
    // if no token, stay at default
    if (!localStorage.getItem('usertoken'))
      return;
    else {
      getLoggedInUser(localStorage.getItem('usertoken')).then(result => console.log(result));
      setLoggedIn(true);
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
  }

  const handleLogin = (userData) => {
    getTokenForUser(userData)
    .then( resJson => {
      logUserIn(resJson);
    })
    .catch(err => console.log(err));
  }

  const handleSignUp = ({username, password}) => {
    signUpUser({username, password})
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