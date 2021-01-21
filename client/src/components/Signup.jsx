import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMessages,
  updateErrMessage,
  updateSuccessMessage,
} from '../features/messagesSlice'
import { Button, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../styles/signup.css'
import api from '../api'

export default function Signup() {
  let dispatch = useDispatch()
  let messagesSelection = useSelector(selectMessages)

  const history = useHistory()

  let id_numberRef = useRef(null)
  let passwordRef = useRef(null)
  let confirmRef = useRef(null)
  let firstNameRef = useRef(null)
  let lastNameRef = useRef(null)

  const handleSignup = () => {
    let newUser = {
      id_number: id_numberRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      confirm: confirmRef.current.checked,
    }
    if (newUser.password.length < 4) {
      dispatch(updateErrMessage('סיסמה צריכה להיות לפחות 4 תווים '))
      return
    }
    if (newUser.id_number.length !== 9) {
      dispatch(updateErrMessage('תעודת זהות חייבת להכיל 9 ספרות בלבד'))
      return
    }
    if (newUser.firstName === '') {
      dispatch(updateErrMessage('יש להכניס שם פרטי'))
      return
    }
    if (newUser.lastName === '') {
      dispatch(updateErrMessage('יש להכניס שם משפחה'))
      return
    }
    if (newUser.confirm === false) {
      dispatch(updateErrMessage('חייב לאשר את התקנון '))
      return
    }

    api
      .signup(newUser)
      .then((res) => {
        dispatch(updateErrMessage(''))
        dispatch(updateSuccessMessage('נרשמת בהצלחה'))
        setTimeout(() => {
          history.push('/login')
        }, 500)
      })
      .catch((err) => {
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
    <div className="signup">
      <h1>הרשמה</h1>

      <p>:תעודת זהות </p>
      <FormControl
        type="text"
        placeholder="תעודת זהות"
        ref={id_numberRef}
        onFocus={resetErr}
      />
      <p>:שם פרטי </p>

      <FormControl
        type="text"
        placeholder="שם פרטי"
        ref={firstNameRef}
        onFocus={resetErr}
      />
      <p>:שם משפחה </p>

      <FormControl
        type="text"
        placeholder="שם משפחה"
        ref={lastNameRef}
        onFocus={resetErr}
      />
      <p>:סיסמה </p>

      <FormControl
        type="text"
        placeholder="סיסמה"
        ref={passwordRef}
        onFocus={resetErr}
      />
      <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
      <div style={{ color: 'green' }}>{messagesSelection.successMessage}</div>
      <a
        className="explenation-video"
        href="https://www.youtube.com/watch?v=Ox2hw7RayGM&t=2s&ab_channel=LeeYahav"
        target="_blank"
      >
        סרטון הסבר
      </a>
      <br />
      <input
        type="checkbox"
        ref={confirmRef}
        onChange={updateConfirm}
        style={{ marginRight: '.5em' }}
      />

      <div className="takanon">
        <p>
          אני מאשר בזו שהתוכנה הנל נועדה לסייע לי ויכול להיות שיהיו באגים בתוכנה
        </p>
        <p>
          ובשל כך אני מתחיב שלא לתבוע את היוצר כיוון שהמטרה שלו היא לעזור לי
          והכוונות שלו טובות
        </p>
      </div>
      <Button onClick={handleSignup}>הרשם</Button>
    </div>
  )
}
