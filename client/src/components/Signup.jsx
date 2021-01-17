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

function validateIdNumber(idNumber) {
  return idNumber.length === 9
}
export default function Signup() {
  let dispatch = useDispatch()
  let messagesSelection = useSelector(selectMessages)

  const history = useHistory()

  let id_numberRef = useRef(null)
  let passwordRef = useRef(null)
  let confirmRef = useRef(null)

  const handleSignup = () => {
    let newUser = {
      id_number: id_numberRef.current.value,
      password: passwordRef.current.value,
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
        placeholder="תעודת זהות"
        ref={id_numberRef}
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
