import React, { useState } from 'react'
import './App.css'
import MyNav from "./components/MyNav"
import MyRouter from './components/MyRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, logUser } from './features/userSlice'


export default function App() {
  let id_number = localStorage.getItem("id_number")
  let token = localStorage.getItem("token")
  let dispatch = useDispatch()
  if(id_number){
    dispatch(logUser({id_number,token}))
  } 
else{
    dispatch(logout())
}
  return (
    <Router>
      <div className="App">
       <MyNav />
        <header className="App-header">
          <MyRouter />
        </header>
      </div>
    </Router>
  )
}


