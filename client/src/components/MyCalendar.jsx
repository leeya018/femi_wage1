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
import { set } from 'mongoose'

export default function MyCalendar() {
  const [value, setValue] = useState(new Date())

  const [day, setDay] = useState(value.getDate())
  const [month, setMonth] = useState(value.getMonth())
  const [year, setYear] = useState(value.getFullYear())
  const [datesOfShifts, setDatesOfShifts] = useState([])



  let dispatch = useDispatch()
  let femi = useSelector(selectFemi)

  const img = <img className="saved" src={savedIcon} alt="" />

  let id_number = localStorage.getItem('id_number')
  let token = localStorage.getItem('token')



  useEffect(() => {
    getMyMonthlyShifts()
  }, [month, year])


  const updateDatesWithShifts = (shifts)=>{
    let dates = []
    for (const shift of shifts) {
      let date = new Date(shift.creationDate)
      const dateObj = fromDateToDateObj(date)
      dates.push(dateObj)
    }
    setDatesOfShifts(dates)
  }

  const getMyMonthlyShifts = () => {
    api
      .getMyMonthlyShifts(month, year, id_number, token)
      .then((res) => {
        dispatch(updateErrMessage(''))
        dispatch(updateAllMyShifts(res.data))
        updateDatesWithShifts(res.data)
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

  const markWorkingDays = (date,view) => {
    console.log('view', view)
    let { day, month, year } = fromDateToDateObj(date)
    for (const myDate of datesOfShifts) {
      if (myDate.day == day && myDate.month == month && myDate.year == year) {
        return img
      }
    }
    return null
  }

  const openRightModal = (date) => {
    setDay(() => date.getDate())
    const hasShift = markWorkingDays(date)
    if (hasShift) {
      let shiftId = getShiftIdByDate()
      if (shiftId) {
        getSalaryByID(shiftId)
      }
      return
    }
    dispatch(updateShowAddShift(true))
  }

  const getShiftIdByDate = () => {
    for (const shift of femi.allMyShifts) {
      if (new Date(shift.creationDate).getDate() === day) {
        return shift._id
      }
    }
    return null
  }

  // const updateMonthAndYear = (date) => {
  //   console.log('date', date)
  //   setMonth(date.getMonth())
  //   setYear(date.getFullYear())
  //   setDay(date.getDate())
  // }

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

  const fromDateToDateObj = (date) => {
    const dateObj = {
      day: date.getDate(),
      month: date.getMonth(),
      yearn: date.getDate(),
    }
    return dateObj
  }

  const increaseMonth = () => {
    let prevMonth = month
    setMonth((prev) => (prev + 1) % 12)
    if (prevMonth == 11) {
      setYear((prev) => prev + 1)
    }
  }

  const decreaseMonth = () => {
    let prevMonth = month
    setMonth((prev) => (((prev - 1) % 12) + 12) % 12)
    if (prevMonth == 0) {
      setYear((prev) => prev - 1)
    }
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
        <AddShift creationDate={new Date(year, month, day)} />
      ) : (
        <Calendar
          tileContent={({ activeStartDay, date,view }) => markWorkingDays(date,view)}
          onClickDay={(date) => openRightModal(date)}
          // onClick={(value) => alert('New date is:')}
          // onClickMonth={(value) => alert('New date is:')}
          nextLabel={<p onClick={increaseMonth}>{'>'}</p>}
          prevLabel={<p onClick={decreaseMonth}>{'<'}</p>}
          next2Label={
            <p onClick={() => setYear((prev) => prev + 1)}>{'>>'}</p>
          }
          prev2Label={
            <p onClick={() => setYear((prev) => prev - 1)}>{'<<'}</p>
          }
          onChange={setValue}
          value={value}
        />
      )}
    </div>
  )
}
