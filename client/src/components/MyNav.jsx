import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default function MyNav({ isLogged, updateLogged }) {
  console.log("render nav")
  console.log("isLogged:" + isLogged)
  return (
    <nav>
      <ul style={{fontSize: "1.4em" , marginTop:"1em"}}>
        <li>
          {!isLogged && <Link to="/">כניסה</Link>}
        </li>
        <li>
          {!isLogged && <Link to="/signup">הרשמה</Link>}
        </li>
        <li>
          {isLogged && (
            <Link to="/addshift">הכנסת משמרת</Link>
          )}
        </li>
        <li>
          {isLogged && (
            <Link to="/myshifts">המשמרות שלי </Link>
          )}
        </li>
        <li>
          {isLogged && (
            <Link to="/monthlysalary">סיכום חודשי</Link>
          )}
        </li>
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
