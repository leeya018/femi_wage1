import React, { useState } from 'react'
import './App.css'
import MyNav from "./components/MyNav"
import MyRouter from './components/MyRouter'
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("username"))

  const updateLogged = (userIsLog) => {
    setIsLogged(userIsLog)
  }
  return (
    <Router>
      <div className="App">
       <MyNav isLogged={isLogged} updateLogged={updateLogged}/>
        <header className="App-header">
          <MyRouter updateLogged={updateLogged} isLogged={isLogged}/>
        </header>
      </div>
    </Router>
  )
}

export default App
