import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFemi,
  updateAllMyShifts,
  updateSalaryById,
  updateShowAddShift,
  updateShowModal,
} from '../features/femiSlice'
import MyShiftModal from './MyShiftModal'

import AddShift from './AddShift'

import { selectMessages, updateErrMessage } from '../features/messagesSlice'

import savedIcon from '../images/savedIcon.png'
import '../styles/myCalender.css'
import api from '../api'

let month

let dates = []
export default function MyCalendar() {
  const [value, setValue] = useState(new Date())
  const [currDate, setCurrDate] = useState(null)

  
  let dispatch = useDispatch()
  let femi = useSelector(selectFemi)

  const img = <img className="saved" src={savedIcon} alt="" />

  let id_number = localStorage.getItem('id_number')
  let token = localStorage.getItem('token')

  useEffect(() => {
    month = value.getMonth()
    getMyMonthlyShifts(month + 1)
  }, [])

  const getMyMonthlyShifts = (chosenMonth) => {
    month = chosenMonth

    api
      .getMyMonthlyShifts(month - 1, id_number, token)
      .then((res) => {
        dispatch(updateErrMessage(''))
        dispatch(updateAllMyShifts(res.data))
      })
      .catch((err) => {
        console.log('err', err)
        if (err.response) {
          dispatch(updateErrMessage(err.response.data.message))
        } else {
          dispatch(updateErrMessage(err.message))
        }
      })
  }

  const markWorkingDays = (date) => {
    return dates.includes(date.getDate()) ? img : null
  }

  const openRightModal = (date) => {
    setCurrDate(date)
    const hasShift = markWorkingDays(date)
    if (hasShift) {
      let shiftId = getShiftIdByDate(date)
      if (shiftId) {
        getSalaryByID(shiftId)
      }
      return
    }
    dispatch(updateShowAddShift(true))
  }

  const getShiftIdByDate = (date) => {
    for (const shift of femi.allMyShifts) {
      if (new Date(shift.creationDate).getDate() === date.getDate()) {
        return shift._id
      }
    }
    return null
  }

  const getSalaryByID = (shiftId) => {
    api
      .getSalaryByID(shiftId, id_number, token)
      .then((res) => {
        console.log(res.data)
        dispatch(updateSalaryById(res.data))
        dispatch(updateShowModal(true))
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  for (const shift of femi.allMyShifts) {
    dates.push(new Date(shift.creationDate).getDate())
  }
  return (
    <div>
      {femi.showModal && ( // tell react to not render it
        <MyShiftModal
          show={femi.showModal} // just make it visible
          handleOnHide={() => dispatch(updateShowModal(false))}
        />
      )}

      {femi.showAddShift ? (
        <AddShift creationDate={currDate}/>
      ) : (
        <Calendar
          tileContent={({ activeStartDay, date }) => markWorkingDays(date)}
          onClickDay={(date) => openRightModal(date)}
          onChange={setValue}
          // onClickDay={()=>alert("this is open the modal to show the shift  ")}
          value={value}
          // onClickMonth={(value, event) => alert(value)}
          // onChange={(value, event) => alert( value)}
          onDrillDown={({ activeStartDate, view }) =>
            alert('Drilled down to: ', activeStartDate, view)
          }
        />
      )}
    </div>
  )
}
