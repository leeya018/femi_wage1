import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export default function MyNav({ isLogged, updateLogged }) {
  console.log('render nav')
  const location = useLocation()
  console.log('isLogged:' + isLogged)
  console.log('url:' + location.pathname)
  return (
    <nav>
      <ul style={{ fontSize: '1.4em', marginTop: '1em' }}>
        <li>{location.pathname == '/signup' && <Link to="/">כניסה</Link>}</li>
        {isLogged && (
          <li>
            <Link to="/addshift">הכנסת משמרת</Link>
            <br />
            <Link to="/myshifts">המשמרות שלי </Link>
            <br />
            <Link to="/monthlysalary">סיכום חודשי</Link>
            <br />
          </li>
        )}
        <li>
          {isLogged && (
            <Link
              to="/login"
              onClick={() => {
                localStorage.clear()
                updateLogged(false)
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
