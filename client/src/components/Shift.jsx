import React from 'react'
import { useDispatch } from 'react-redux'
import util from '../util'
import { updateShowModal } from '../features/femiSlice'
import '../styles/shift.css'
import api from '../api'

//need to change all the object of the shift in the db to be match to db !!!!!
export default function Shift({ updateSal, _id, total, creationDate }) {
  let id_number = localStorage.getItem('id_number')
  let token = localStorage.getItem('token')
  let dispatch = useDispatch()
  const getSalaryByID = () => {
    api
      .getSalaryByID(_id, id_number, token)
      .then((res) => {
        // dispatch(updateErrMessage(''))
        updateSal(res.data)
        dispatch(updateShowModal(true))
      })
      .catch((err) => {
        // if (err.response) {
        //   dispatch(updateErrMessage(err.response.data.message))
        // } else {
        //   dispatch(updateErrMessage(err.message))
        // }
      })
  }
  let day = parseInt(creationDate.split('-')[2])
  let parsedDate = util.formatDate(creationDate)
  let dayOfWeek = new Date(parsedDate).toLocaleString('default', {
    weekday: 'long',
  })
  return (
    <li className="shift" onClick={getSalaryByID}>
      <p>{dayOfWeek + ' - ' + day}</p>

      <h2>סכום כולל: {`  ` + total} שקלים</h2>
    </li>
  )
}
