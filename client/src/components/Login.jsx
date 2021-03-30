import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logUser, selectUser } from '../features/userSlice'
import {
  selectMessages,
  updateErrMessage,
  updateSuccessMessage,
} from '../features/messagesSlice'
import { Button, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../styles/signup.css'
import api from '../api'

export default function Login() {
  let dispatch = useDispatch()
  const history = useHistory()
  let userSelection = useSelector(selectUser)
  let messagesSelection = useSelector(selectMessages)

  let id_numberRef = useRef(null)
  let passwordRef = useRef(null)


  useEffect(() => {
    dispatch(updateSuccessMessage(''))
    if(localStorage.getItem("id_number")){
      history.push('/calender')
    }
  }, [])
  const handleLogin = () => {
    let userInfo = {
      id_number: id_numberRef.current.value,
      password: passwordRef.current.value,
    }
    if (userInfo.id_number.length !== 9) {
      dispatch(updateErrMessage('תעודת זהות חייבת להכיל 9 ספרות בלבד'))
      return
    }
    api
      .login(userInfo)
      .then((res) => {
        history.push('/calender')
        let {token , id_number} = res.data 
        localStorage.setItem('token', token)
        localStorage.setItem('id_number', id_number)
        dispatch(logUser({token, id_number}))
        dispatch(updateErrMessage(''))
      })
      .catch((err) => {
        dispatch(updateErrMessage(err.response.data.message))
      })
  }

  const resetErr = () => {
    dispatch(updateErrMessage(''))
  }

  return (
    <div className="login">
      <h1>כניסה</h1>

      <p>:תעודת זהות </p>
      <FormControl
        type="text"
        defaultValue = "300628583"
        placeholder="תעודת זהות"
        onFocus={resetErr}
        ref={id_numberRef}
      />
      <p>:סיסמה </p>

      <FormControl
        type="text"
        defaultValue = "1111"

        placeholder="סיסמה"
        onFocus={resetErr}
        ref={passwordRef}
      />
      <a
        className="explenation-video"
        href="https://www.youtube.com/watch?v=c4QgG-Smbc0&feature=youtu.be&ab_channel=LeeYahav"
        target="_blank"
      >
        סרטון הסבר
      </a>
      <br />
      <Button onClick={handleLogin}>התחברות</Button>
      <div className="registration-link">
        <p> : במידה ואינך רשום </p>
        <a href="/signup">הרשמה לאתר</a>
      </div>
      <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
      <div style={{ color: 'green' }}>{messagesSelection.successMessage}</div>
    </div>
  )
}
