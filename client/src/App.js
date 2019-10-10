import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { signUpUser, getTokenForUser, getLoggedInUser, sendNewScale } from './Utils.js'
import { MoodForm } from './components/MoodForm.js'
import { ScaleEditor } from './components/ScaleEditor.js'
import { LoginForm } from './components/LoginForm.js'
import { UserHome } from './components/UserHome.js'

const App = () => {
  //not logged in by default
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userData, setUserData ] = useState({username: "", id: -1, moodScales: []});

  const addNewScale = (moodScale) => {
    const {scaleItems, ...newScale} = moodScale;
    const newScaleItems = Array.from({length: Number(scaleItems)}, (val, index) => ({ index, alias: index+1 }));
    sendNewScale({...newScale, scaleItems: newScaleItems, user: userData.id}, localStorage.getItem('usertoken'))
    .then(result => console.log(result))
    .catch(err => console.log(err));
  }

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
              <MoodForm moodScales={userData.moodScales} />
            </Route>
            <Route path="/editscales">
              <ScaleEditor moodScales={userData.moodScales} addNewScale={addNewScale} />
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