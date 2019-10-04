import React from 'react';
import { moodForm } from './components/MoodForm.js'
import { scaleEditor } from './components/ScaleEditor'

function App() {
  return (
    <div>
      {scaleEditor()}
    </div>
  );
}

export default App;
