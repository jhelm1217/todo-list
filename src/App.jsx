import React, { useState } from 'react'
import ToDoList from './ToDoList.jsx'
import './App.css'
import logo from './assets/splat.jpeg'

function App() {
  return (
    <div>
     {/* <div style={{ backgroundImage: `url(${logo})`, backgroundSize: '100% 100%', minHeight: '100vh' }}> */}
      <h1 style= {{ fontSize: '50px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.80)', color: 'red' }}>
        GET TO IT NOW!</h1>
    <ToDoList /> 
    </div>
  )
}

export default App
