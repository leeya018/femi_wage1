import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMessages,
  updateErrMessage,
  updateSuccessMessage,
} from '../features/messagesSlice'
import { Button, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import api from '../api'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export default function Signup() {
  let dispatch = useDispatch()
  let messagesSelection = useSelector(selectMessages)

  const history = useHistory()

  let usernameRef = useRef(null)
  let passwordRef = useRef(null)
  let emailRef = useRef(null)
  let confirmRef = useRef(null)

  const handleSignup = () => {
    let newUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      confirm: confirmRef.current.checked,
    }
    if (!validateEmail(newUser.email)) {
      dispatch(updateErrMessage('צריך להכניס אימייל תקין'))
      return
    }
    if (newUser.password.length < 4) {
      dispatch(updateErrMessage('סיסמה צריכה להיות לפחות 4 תווים '))
      return
    }
    if (newUser.username.length < 4) {
      dispatch(updateErrMessage('שם משתמש צריך להיות לפחות 4 תווים '))
      return
    }
    if (newUser.confirm === false) {
      dispatch(updateErrMessage('חייב לאשר את התקנון '))
      return
    }

    api
      .signup(newUser)
      .then((res) => {
        console.log(res.data)
        dispatch(updateErrMessage(''))
        dispatch(updateSuccessMessage('נרשמת בהצלחה'))
        setTimeout(() => {
          history.push('/login')
        }, 500)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response.data.message))
        dispatch(updateErrMessage(err.response.data.message))
      })
  }

  const updateConfirm = (e) => {
    confirmRef.current.checked = e.target.checked
  }

  const resetErr = () => {
    dispatch(updateErrMessage(''))
  }
  return (
    <div>
      <h1>הרשמה</h1>
      <a
        href="https://www.youtube.com/watch?v=Ox2hw7RayGM&t=2s&ab_channel=LeeYahav"
        target="_blank"
      >
        סרטון הסבר
      </a>
      <FormControl
        type="text"
        placeholder="אימייל"
        ref={emailRef}
        onFocus={resetErr}
      />
      <FormControl
        type="text"
        placeholder="שם משתמש"
        ref={usernameRef}
        onFocus={resetErr}
      />
      <FormControl
        type="text"
        placeholder="סיסמה"
        ref={passwordRef}
        onFocus={resetErr}
      />
      <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
      <div style={{ color: 'green' }}>{messagesSelection.successMessage}</div>
      <input
        type="checkbox"
        ref={confirmRef}
        onChange={updateConfirm}
        style={{ marginRight: '.5em' }}
      />
      <div>
        <p></p>
        <p></p>
        <p>אני מאשר בזו שהתוכנה הנל נועדה לסייע לי</p>
        <p>ויכול להיות שיהיו באגים בתוכנה</p>
        <p>ובשל כך אני מתחיב שלא לתבוע את היוצר</p>
        <p>כיוון שהמטרה שלו היא לעזור לי </p>
        <p>והכוונות שלו טובות</p>
      </div>
      <Button onClick={handleSignup}>הרשם</Button>
    </div>
  )
}
