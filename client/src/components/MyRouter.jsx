import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Nav from './MyNav'
import { useHistory, useLocation } from 'react-router-dom'
import MyCalendar from './MyCalendar'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
export default function MyRouter() {
  const history = useHistory()
  const location = useLocation()

  let id_number = localStorage.getItem('id_number')
  let userSelection = useSelector(selectUser)
  useEffect(() => {
    if (!id_number && location.pathname !== '/signup') {
      history.push('/login')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        {!userSelection.isLogged ? <Redirect to="/login" /> : <Redirect to="/calender" />}
      </Route>

      <Route
        path="/login"
        component={() => <Login  />}
      ></Route>
      
      <Route
        path="/calender"
        component={() => <MyCalendar />}
      ></Route>
      <Route path="/signup" component={Signup}></Route>
    </Switch>
  )
}
