import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFemi,
  updateAllMyShifts,
  updateSalaryById,

} from '../features/femiSlice'
import MyShiftModal from './MyShiftModal'
import MyMonthlySalaryModal from './MyMonthlySalaryModal'
import { selectMessages, updateErrMessage } from '../features/messagesSlice'
import {
  selectModals,
  updateShowAddShift,
  updateShowShiftModal,
  updateShowMonthlySalaryModal
} from "../features/modalsSlice"
import savedIcon from '../images/savedIcon.png'
import '../styles/myCalender.css'
import api from '../api'
import MyAddShiftModal from './MyAddShiftModal'

let id_number
let token

export default function MyCalendar() {
  const [value, setValue] = useState(new Date())
  const [day, setDay] = useState(value.getDate())
  const [month, setMonth] = useState(value.getMonth())
  const [year, setYear] = useState(value.getFullYear())

  const [datesOfShifts, setDatesOfShifts] = useState([])

  let dispatch = useDispatch()
  let femi = useSelector(selectFemi)
  let modals = useSelector(selectModals)

  const img = <img className="saved" src={savedIcon} alt="" />

  useEffect(() => {
    id_number = localStorage.getItem('id_number')
    token = localStorage.getItem('token')
  }, [])

  useEffect(() => {
    getMyMonthlyShifts()
  }, [month, year, femi.salById])

  const updateDatesWithShifts = (shifts) => {
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
        if (err.response) {
          dispatch(updateErrMessage(err.response.data.message))
        } else {
          dispatch(updateErrMessage(err.message))
        }
      })
  }

  const markWorkingDays = (date, view) => {
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
      let shiftId = getShiftIdByDate(date)
      if (shiftId) {
        getSalaryByID(shiftId)
      }
    } else {
      dispatch(updateShowAddShift(true))
    }
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
        console.log("this is the sal by id")
        console.log(res.data)
        dispatch(updateSalaryById(res.data))
        dispatch(updateShowShiftModal(true))

      })
      .catch((err) => { })
  }

  const fromDateToDateObj = (date) => {
    const dateObj = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
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
      {modals.showShiftModal && ( // tell react to not render it
        <MyShiftModal
          show={modals.showShiftModal} // just make it visible
          handleOnHide={() => dispatch(updateShowShiftModal(false))}
        />
      )}
      {modals.showAddShift && (
        <MyAddShiftModal
          creationDate={new Date(year, month, day)}
          show={modals.showAddShift}
          handleOnHide={() => dispatch(updateShowAddShift(false))}
        />
      )}
      {modals.showMonthlySalaryModal && (
        <MyMonthlySalaryModal
          month={month}
          year={year}
          handleOnHide={() => dispatch(updateShowMonthlySalaryModal(false))}
          show={modals.showMonthlySalaryModal}
        />
      )}
      <>
        <button onClick={() => dispatch(updateShowMonthlySalaryModal(true))}>
          משכורת חודשית
        </button>
        <Calendar
          calendarType={'Hebrew'}
          tileContent={({ activeStartDay, date, view }) =>
            markWorkingDays(date, view)
          }
          onClickDay={(date) => openRightModal(date)}
          nextLabel={<p onClick={increaseMonth}>{'>'}</p>}
          prevLabel={<p onClick={decreaseMonth}>{'<'}</p>}
          next2Label={<p onClick={() => setYear((prev) => prev + 1)}>{'>>'}</p>}
          prev2Label={<p onClick={() => setYear((prev) => prev - 1)}>{'<<'}</p>}
          onChange={setValue}
          value={value}
          maxDate={new Date()}
          minDate={new Date(2021, 0, 1)}
        />
      </>
    </div>
  )
}
