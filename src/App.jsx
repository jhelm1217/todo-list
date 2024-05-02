import React, { useState } from 'react'
import ToDoList from './ToDoList.jsx'
import './App.css'

function App() {
  return (
    <div>
      <h1 style= {{ fontSize: '50px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.80)', color: 'red' }}>
        GET TO IT NOW!</h1>
    <ToDoList /> 
    </div>
  )
}

export default App
