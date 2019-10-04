import React from 'react';
import { moodForm } from './components/MoodForm.js'
import { scaleEditor } from './components/ScaleEditor'
import { loginForm } from './components/LoginForm.js'

const App = () => {


  return (
    <div>
      {loginForm()}
    </div>
  );
}

export default App;