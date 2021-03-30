import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {logout, selectUser } from '../features/userSlice'

export default function MyNav() {
  console.log('render nav')
  const location = useLocation()
  let dispatch = useDispatch()
  let userSelection = useSelector(selectUser)
  return (
    <nav>
      <ul style={{ fontSize: '1.4em', marginTop: '1em' }}>
        <li>{location.pathname == '/signup' && <Link to="/">כניסה</Link>}</li>

        <li>
          {userSelection.isLogged && (
            <Link
              to="/login"
              onClick={() => {
                dispatch(logout())
              }}
            >
              יציאה
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
