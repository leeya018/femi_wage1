import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFemi,
  updateAllMyShifts,
  updateSalaryById,
  updateShowAddShift,
  updateShowModal,
} from '../features/femiSlice'
import MyShiftModal from './MyShiftModal'
import MonthlySalary from './MonthlySalary'
import { selectMessages, updateErrMessage } from '../features/messagesSlice'

import savedIcon from '../images/savedIcon.png'
import '../styles/myCalender.css'
import api from '../api'
import MyAddShiftModal from './MyAddShiftModal'

export default function MyCalendar() {
  const [value, setValue] = useState(new Date())
  const [day, setDay] = useState(value.getDate())
  const [month, setMonth] = useState(value.getMonth())
  const [year, setYear] = useState(value.getFullYear())

  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [datesOfShifts, setDatesOfShifts] = useState([])
  const [showMonthlySalary, setShowMonthlySalary] = useState(false)

  let dispatch = useDispatch()
  let femi = useSelector(selectFemi)

  const img = <img className="saved" src={savedIcon} alt="" />

  let id_number = localStorage.getItem('id_number')
  let token = localStorage.getItem('token')

  useEffect(() => {
    // if (!showConfirmationModal) {
    console.log('this si chabg e')
    getMyMonthlyShifts()
    // }
  }, [month, year, showConfirmationModal])

  const closeMonthlySalary = () => {
    setMonth(new Date().getMonth())
    setShowMonthlySalary(false)
  }

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

  // const isDateInDates = (date) => {
  //   let img = markWorkingDays(date)
  //   return img ? true : false
  // }

  const openRightModal = (date) => {
    setDay(() => date.getDate())
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
        dispatch(updateSalaryById(res.data))
        dispatch(updateShowModal(true))
      })
      .catch((err) => {})
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
      {femi.showModal && ( // tell react to not render it
        <MyShiftModal
          show={femi.showModal} // just make it visible
          handleOnHide={() => dispatch(updateShowModal(false))}
        />
      )}
      {femi.showAddShift && (
        <MyAddShiftModal
          showConfirmationModal={showConfirmationModal}
          updateShowConfirmationModal={setShowConfirmationModal}
          creationDate={new Date(year, month, day)}
          show={femi.showAddShift}
          handleOnHide={() => dispatch(updateShowAddShift(false))}
        />
      )}
      // ) : ( //{' '}
      <>
        //{' '}
        {/* {showMonthlySalary ? (
          //   <MonthlySalary
          //     month={month}
          //     year={year}
          //     closeWindow={closeMonthlySalary}
          //   />
          // ) : ( */}
        <>
          <button onClick={() => setShowMonthlySalary(true)}>
            משכורת חודשית
          </button>
          <Calendar
            tileContent={({ activeStartDay, date, view }) =>
              markWorkingDays(date, view)
            }
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
        </>
        // )} //{' '}
      </>
      // )}
    </div>
  )
}

// const updateMonthAndYear = (date) => {
//   'date', date)
//   setMonth(date.getMonth())
//   setYear(date.getFullYear())
//   setDay(date.getDate())
// }
