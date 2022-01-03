import React from 'react';
import './App.css';
import Canvas from './components/Canvas';

import ToolBar from './components/ToolBar';

function App() {
  return (
    <div className="App">
      <ToolBar/>
      <Canvas/>
    </div>
  );
}

export default App;
