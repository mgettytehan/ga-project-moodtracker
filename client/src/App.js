import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { signUpUser, getTokenForUser, getLoggedInUser, sendNewLog, sendNewScale, sendUpdatedScale } from './Utils.js'
import { MoodForm } from './components/MoodForm.js'
import { ScaleEditor } from './components/ScaleEditor.js'
import { LoginForm } from './components/LoginForm.js'
import { UserHome } from './components/UserHome.js'

const LandingPage = () => {
  return(
    <div>
      <h1>Big Mood.</h1>
      <p>A short description here.</p>
      <div><Link to="/login"><button>Login</button></Link></div>
    </div>
  )
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

    const PrivateRoute = ({ children, ...rest }) =>
      (<Route {...rest} 
        render={() =>
          loggedIn ?
          (children) :
          (<Redirect to="/login"/>)
        }
      />);

  const addScaleToUser = newScale => {
    const newUserState = {...userData};
    newUserState.moodScales.push(newScale);
    return newUserState;
  }

  const updateScaleInUser = updatedScale => {
    const newUserState = {...userData};
    const index = newUserState.moodScales.findIndex(moodScale => moodScale.id === updateScale.id);
    //update if found
    if (index >= 0)
      newUserState.moodScales[index] = updatedScale;
    return newUserState;
  }

  const addNewScale = moodScale => {
    const {scaleItems, ...newScale} = moodScale;
    const newScaleItems = Array.from({length: Number(scaleItems)}, (val, index) => ({ index, alias: index+1 }));
    sendNewScale({...newScale, scaleItems: newScaleItems, user: userData.id}, localStorage.getItem('usertoken'))
      .then(newScale => setUserData(addScaleToUser(newScale)))
      .catch(err => console.log(err));
  }

  const updateScale = scaleData => {
    sendUpdatedScale(scaleData, localStorage.getItem('usertoken'))
      .then(updatedScale => setUserData(updateScaleInUser(updatedScale)))
      .catch(err => console.log(err));
  }

  const createMoodLog = logData => {
    let {notes, ...scaleData} = logData;
    if (!notes)
      notes = "No notes";
    const scaleItems = Object.values(scaleData);
    sendNewLog({user: userData.id, notes, scaleItems}, localStorage.getItem('usertoken'))
      .then(console.log)
      .catch(err => console.log(err))
  }

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

  const getJustScales = (moodScales=[]) =>
    moodScales.reduce((acc, moodScale) => {
      acc[moodScale.id] = {scaleName: moodScale.scaleName, scaleType: moodScale.scaleType};
      return acc;
    }, {});

  return (
    <div className="app">
      <header>{loggedIn ? <button onClick={logout}>Logout</button> : ""}</header>
      <main>
        <Switch>
          <PrivateRoute path="/addentry">
            <MoodForm moodScales={userData.moodScales} createMoodLog={createMoodLog} />
          </PrivateRoute>
          <PrivateRoute path="/editscales">
            <ScaleEditor moodScales={userData.moodScales} addNewScale={addNewScale} updateScale={updateScale} />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <UserHome moodScales={getJustScales(userData.moodScales)} />
          </PrivateRoute>
          <Route path="/login">
            <LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp}/>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;