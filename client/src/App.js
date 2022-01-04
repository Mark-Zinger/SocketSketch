import React,{ createContext, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Header from './components/Header';


import ToolBar from './components/ToolBar';

export const CanvasContext = createContext();

function App() {

  return (
    <div className="App">
      <Header/>
      <ToolBar/>
      <Canvas/>
    </div>
  );
}

export default App;
