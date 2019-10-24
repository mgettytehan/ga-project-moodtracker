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
      <h1 className="main-header">Big Mood.</h1>
      <div className="intro-text">
        <p>Log your mood the way you want to.</p>
        <Link to="/login">Login or Sign Up</Link>
      </div>
    </div>
  )
};

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
    let newScaleItems;
    if (newScale.scaleType === "text")
      newScaleItems = Array.from({length: Number(scaleItems)}, (val, index) => ({ index, alias: index+1 }));
    else if (newScale.scaleType === "color")
      newScaleItems = Array.from({length: Number(scaleItems)}, (val, index) => ({ index, alias: "#000000" }));
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
    .then(resJson => {
      const {token, user} = resJson;
      logUserIn(token);
      setUserData(user);
    })
    .catch(e => console.log(e))
  }

  const handleSignUp = ({username, password}) => {
    signUpUser({username, password})
      .then(user => {
        logUserIn(user.token);
      })
      .then( () => 
        getLoggedInUser(localStorage.getItem('usertoken'))
          .then(user => { setUserData(user); return true;})
      )
      .catch(err => {console.log(err); return false;});
  }

  const getJustScales = (moodScales=[]) =>
    moodScales.reduce((acc, moodScale) => {
      acc[moodScale.id] = {scaleName: moodScale.scaleName, scaleType: moodScale.scaleType};
      return acc;
    }, {});

  return (
    <div className="app">
      <header><div className="logo"><Link to={loggedIn ? "/home" : "/"}>bgm</Link></div>{loggedIn ? (<div><button onClick={logout}>Logout</button></div>) : ""}</header>
      <main>
        {loggedIn ? (<><div>Welcome, {userData.username}.</div><hr /></>) : ""}
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
          <Route path="/login" render={
            () => loggedIn ?
            (<Redirect to="/home" />) :
            (<LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp}/>)
          }/>
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