import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'
import AddShift from './AddShift'
import MonthlySalary from './MonthlySalary'
import MyShifts from './MyShifts'
import Signup from './Signup'
import Login from './Login'
import Nav from './MyNav'
import { useHistory, useLocation } from 'react-router-dom'
import MyCalendar from "./MyCalendar"
export default function MyRouter({ updateLogged, isLogged }) {
  const history = useHistory()
  const location = useLocation()

  let id_number = localStorage.getItem('id_number')

  useEffect(() => {
    if (!id_number && location.pathname !== '/signup') {
      history.push('/login')
    }
  }, [])
  return (
    <MyCalendar />
    // <Switch>
    //   <Route exact path="/">
    //     {!isLogged ? <Redirect to="/login" /> : <Redirect to="/addshift" />}
    //   </Route>

    //   <Route
    //     path="/login"
    //     component={() => <Login updateLogged={updateLogged} />}
    //   ></Route>
    //   <Route path="/signup" component={Signup}></Route>
    //   <Route path="/myshifts" component={MyShifts}></Route>
    //   <Route path="/addshift" component={AddShift}></Route>
    //   <Route path="/monthlysalary" component={MonthlySalary}></Route>
    // </Switch>
  )
}
