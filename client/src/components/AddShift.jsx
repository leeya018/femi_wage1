import React, { useEffect, useRef, useState } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import {connect , useDispatch, useSelector } from 'react-redux'

import {
  selectMessages,
  updateErrMessage,
  updateSuccessMessage,
  updateTimeErrMessage,
} from '../features/messagesSlice'
import CoinIcon from './CoinIcon'
import api from '../api'
import {
  addInstitution,
  selectFemi,
  resetFemiState,
  toggleFriday,
  updateShowAddShift,
  updateShowModal,
  updateBaseSalary,
  updateEndTime,
  updateStartTime,
  updateTotalSumInstitutions,
  updateShow1,
  updateTotalTime,
} from '../features/femiSlice'
import '../styles/addShift.css'
import util from '../util'
import List from './List'
import ConfirmModal from './ConfirmModal'
import ConfirmModalBefore from './ConfirmModalBefore'

const  AddShift = ({  creationDate,
                      showConfirmationModal,
                      updateShowConfirmationModal})=>{
  let dispatch = useDispatch()
  let femi = useSelector(selectFemi)


  let messages = useSelector(selectMessages)

  let testsRef = useRef(null)
  let token = localStorage.getItem('token')
  let institutionNameRef = useRef(null)

  useEffect(() => {
    dispatch(updateTotalSumInstitutions())
  }, [femi.institutions.length, femi.isFriday])

  useEffect(() => {
    let { startTime, endTime } = femi
    if (startTime && endTime) {
      dispatch(updateTotalTime())
      dispatch(updateBaseSalary())
    }
  }, [femi.startTime, femi.endTime])

  useEffect(() => {
    if (femi.totalTime === -1) {
      dispatch(updateTimeErrMessage(' הפרשי הזמן לא יכולים להיות שליליים '))
    } else if (femi.totalTime === 0) {
      dispatch(updateTimeErrMessage(' הפרשי הזמן לא יכולים להיות שווים ל 0  '))
    } else {
      dispatch(updateTimeErrMessage(''))
    }
  }, [femi.totalTime])

  const addDayInfo = () => {
    let { totalTime, institutions } = femi
    let id_number = localStorage.getItem('id_number')
    let dayInfo = util.createDayInfo(
      totalTime,
      institutions,
      id_number,
      femi.totalSumInstitutions,
      femi.baseSalary,
      creationDate
    )

    api
      .saveDay(dayInfo, id_number, token)
      .then((res) => {
        dispatch(updateSuccessMessage(res.data.message))
        dispatch(updateErrMessage(''))
        dispatch(resetFemiState())
        updateShowConfirmationModal(true)
        dispatch(updateShow1(false))
      })
      .catch((error) => {
        if (error.response) {
          dispatch(updateErrMessage(error.response.data.message))
        } else {
          dispatch(updateErrMessage(error.message))
        }
      })
  }

  const checkAllFields = () => {
    if (femi.institutions.length < 1) {
      dispatch(updateErrMessage('חייב להכניס מוסד אחד לפחות'))
      return
    }
    if (messages.errMessage !== '') {
      return
    }
    dispatch(updateShow1(true))
  }

  return (
    <div className="add-shift">
      <ConfirmModal
        show={showConfirmationModal} // just make it visible
        handleOnHide={() => updateShowConfirmationModal(false)}
      />
      <ConfirmModalBefore
        InstitutionsLen={femi.institutions.length}
        errMessage={femi.errMessage}
        addDayInfo={addDayInfo}
        show={femi.show1} // just make it visible
        handleOnHide={() => dispatch(updateShow1(false))}
      />
      <div className="btn-container">
        <Button
          variant="secondary"
          onClick={() => dispatch(updateShowAddShift(false))}
        >
          סגור
        </Button>
      </div>
      <h3 className="title">הזנת יום עבודה</h3>
      <div>
        <input
          type="checkbox"
          onChange={() => dispatch(toggleFriday())}
          style={{ marginRight: '.5em' }}
        />

        <label htmlFor="" style={{ color: femi.isFriday ? 'green' : '' }}>
          יום שישי
        </label>
      </div>
      <div>
        <label htmlFor="">:שעת התחלה </label>
        <FormControl
          type="time"
          min="09:00"
          max="12:00"
          value={femi.startTime}
          onChange={(e) => dispatch(updateStartTime(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="">:שעת סיום </label>
        <FormControl
          type="time"
          min={femi.startTime}
          max="20:00"
          value={femi.endTime}
          onChange={(e) => dispatch(updateEndTime(e.target.value))}
          required
        />
      </div>
      <div style={{ color: 'red' }}>{messages.timeErrMessage}</div>

      <div>זמן עבודה: {femi.totalTime + ' '} שעות</div>

      <h3 style={{ color: 'blue' }}>
        <CoinIcon /> תשלום שעתי: {util.fixNum(femi.baseSalary)}
      </h3>
      <div>
        <div>
          <FormControl
            className="inst-input"
            type="text"
            ref={institutionNameRef}
            placeholder="שם המוסד"
            required
          />
          <FormControl
            className="inst-input"
            type="number"
            ref={testsRef}
            placeholder="מספר דגימות"
          />
          <div style={{ color: 'red' }}>{messages.errMessage}</div>

          <Button
            onClick={() => {
              if (
                institutionNameRef.current.value === '' ||
                testsRef.current.value === ''
              ) {
                dispatch(updateErrMessage('צריך להשלים את כל השדות'))
              } else {
                dispatch(updateErrMessage(''))

                dispatch(
                  addInstitution({
                    institutionName: institutionNameRef.current.value,
                    tests: testsRef.current.value,
                  })
                )
                institutionNameRef.current.value = ''
                testsRef.current.value = ''
              }
            }}
          >
            הוסף מוסד
          </Button>
        </div>

        <div>
          <List institutions={femi.institutions} />
        </div>
        {femi.institutions.length > 1 && (
          <div>
            <h4 style={{ color: 'blue' }}>
              <CoinIcon /> בונוס מעברי מוסד:
              {femi.institutions.length > 0
                ? util.fixNum((femi.institutions.length - 1) * 40)
                : 0}
            </h4>
          </div>
        )}
        <div>
          <h3 style={{ color: 'green' }}>
            <CoinIcon /> סכום סופי:{' '}
            {util.fixNum(femi.totalSumInstitutions + femi.baseSalary)}
          </h3>
          <h3 style={{ color: 'gray', paddingBottom: '3em' }}>
            <CoinIcon /> ממוצע לשעה :
            {util.fixNum(
              (femi.totalSumInstitutions + femi.baseSalary) /
                util.fromTimeStringToHours(femi.totalTime)
            )}
          </h3>
          {/* {femi.institutions.length > 0 &&
            femi.totalTime !== -1 &&
            femi.totalTime !== 0 &&
            femi.totalTime !== '0:00' &&
            messages.errMessage === '' &&
            messages.timeErrMessage === '' && (
              <> */}
          <Button onClick={checkAllFields} style={{ marginBottom: '2em' }}>
            שמור יום עבודה
          </Button>
          {/* </> */}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

const dispatchObject= {
  addInstitution,
  resetFemiState,
  toggleFriday,
  updateShowAddShift,
  updateShowModal,
  updateBaseSalary,
  updateEndTime,
  updateStartTime,
  updateTotalSumInstitutions,
  updateShow1,
  updateTotalTime,

  selectMessages,
  updateErrMessage,
  updateSuccessMessage,
  updateTimeErrMessage,
}
export default connect(null,dispatchObject)(AddShift)