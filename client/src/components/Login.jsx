import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import {
  selectMessages,
  updateErrMessage,
  updateSuccessMessage,
} from '../features/messagesSlice'
import { Button, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import api from '../api'

export default function Login({ updateLogged }) {
  let dispatch = useDispatch()
  const history = useHistory()
  let userSelection = useSelector(selectUser)
  let messagesSelection = useSelector(selectMessages)

  let id_numberRef = useRef(null)
  let passwordRef = useRef(null)

  useEffect(() => {
    dispatch(updateSuccessMessage(''))
  }, [])
  const handleLogin = () => {
    let userInfo = {
      id_number: id_numberRef.current.value,
      password: passwordRef.current.value,
    }
    api
      .login(userInfo)
      .then((res) => {
        console.log(res.data)
        updateLogged(true)
        history.push('/addshift')

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id_number', res.data.id_number)

        dispatch(updateErrMessage(''))
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response.data.message))
        dispatch(updateErrMessage(err.response.data.message))
      })
  }

  const resetid_number = () => {
    id_numberRef.current.value = ''
    dispatch(updateErrMessage(''))
  }
  const resetPassword = () => {
    passwordRef.current.value = ''
    dispatch(updateErrMessage(''))
  }

  return (
    <div>
      <h1>כניסה</h1>
          <a
        href="https://www.youtube.com/watch?v=Ox2hw7RayGM&t=2s&ab_channel=LeeYahav"
        target="_blank"
      >סרטון הסבר</a>
      <FormControl
        type="text"
        placeholder="תעודת זהות"
        onFocus={resetid_number}
        ref={id_numberRef}
      />
      <FormControl
        type="text"
        placeholder="סיסמה"
        onFocus={resetPassword}
        ref={passwordRef}
      />

      <Button onClick={handleLogin}>התחברות</Button>
      <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
      <div style={{ color: 'green' }}>{messagesSelection.successMessage}</div>
    </div>
  )
}
