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
import 
   {selectModals,
  updateShowAddShift,
  updateShowConfirmedModal,
  updateShowBeforeModal,
} from "../features/modalsSlice"
import {
  addInstitution,
  selectAddShiftForm,
  resetFemiState,
  toggleFriday,
  updateBaseSalary,

  
  updateEndTime,
  updateStartTime,
  updateTotalSumInstitutions,
  updateTotalTime,

} from '../features/addShiftFormSlice'
import '../styles/addShift.css'
import util from '../util'
import List from './List'
import ConfirmModal from './ConfirmModal'
import ConfirmModalBefore from './ConfirmModalBefore'

const  AddShift = ({  creationDate})=>{
  let dispatch = useDispatch()
  let addShiftForm= useSelector(selectAddShiftForm)
  let modals = useSelector(selectModals)

  


  let messages = useSelector(selectMessages)

  let testsRef = useRef(null)
  let token = localStorage.getItem('token')
  let institutionNameRef = useRef(null)

  useEffect(() => {
    dispatch(updateTotalSumInstitutions())
  }, [addShiftForm.institutions.length, addShiftForm.isFriday])

  useEffect(() => {
    let { startTime, endTime } = addShiftForm
    if (startTime && endTime) {
      dispatch(updateTotalTime())
      dispatch(updateBaseSalary())
    }
  }, [addShiftForm.startTime, addShiftForm.endTime])

  useEffect(() => {
    if (addShiftForm.totalTime === -1) {
      dispatch(updateTimeErrMessage(' הפרשי הזמן לא יכולים להיות שליליים '))
    } else if (addShiftForm.totalTime === 0) {
      dispatch(updateTimeErrMessage(' הפרשי הזמן לא יכולים להיות שווים ל 0  '))
    } else {
      dispatch(updateTimeErrMessage(''))
    }
  }, [addShiftForm.totalTime])

  const addDayInfo = () => {
    let { totalTime, institutions } = addShiftForm
    let id_number = localStorage.getItem('id_number')
    let dayInfo = util.createDayInfo(
      totalTime,
      institutions,
      id_number,
      addShiftForm.totalSumInstitutions,
      addShiftForm.baseSalary,
      creationDate
    )

    api
      .saveDay(dayInfo, id_number, token)
      .then((res) => {
        dispatch(updateSuccessMessage(res.data.message))
        dispatch(updateErrMessage(''))
        dispatch(resetFemiState())
        dispatch(updateShowBeforeModal(false ))
        dispatch(updateShowConfirmedModal(true))
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
    // if (addShiftForm.institutions.length < 1) {
    //   dispatch(updateErrMessage('חייב להכניס מוסד אחד לפחות'))
    //   return
    // }
    // if (messages.errMessage !== '') {
    //   return
    // }
    dispatch(updateShowBeforeModal(true))

  }

  return (
    <div className="add-shift">
      <ConfirmModal
          show={modals.updateShowConfirmedModal} // just make it visible
      />
      <ConfirmModalBefore
        show={modals.showBeforeModal} // just make it visible
        handleOnHide={() => dispatch(updateShowBeforeModal(false))}
        InstitutionsLen={addShiftForm.institutions.length}
        errMessage={addShiftForm.errMessage}
        addDayInfo={addDayInfo}
      />
      <div className="btn-container">
        <Button
          variant="secondary"
          onClick={() =>{
            dispatch(updateShowAddShift(false))

          }}
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

        <label htmlFor="" style={{ color: addShiftForm.isFriday ? 'green' : '' }}>
          יום שישי
        </label>
      </div>
      <div>
        <label htmlFor="">:שעת התחלה </label>
        <FormControl
          type="time"
          min="09:00"
          max="12:00"
          
          value={addShiftForm.startTime}
          onChange={(e) => dispatch(updateStartTime(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="">:שעת סיום </label>
        <FormControl
          type="time"
          

          min={addShiftForm.startTime}
          max="20:00"
          value={addShiftForm.endTime}
          onChange={(e) => dispatch(updateEndTime(e.target.value))}
          required
        />
      </div>
      <div style={{ color: 'red' }}>{messages.timeErrMessage}</div>

      <div>זמן עבודה: {addShiftForm.totalTime + ' '} שעות</div>

      <h3 style={{ color: 'blue' }}>
        <CoinIcon /> תשלום שעתי: {util.fixNum(addShiftForm.baseSalary)}
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
          <List institutions={addShiftForm.institutions} />
        </div>
        {addShiftForm.institutions.length > 1 && (
          <div>
            <h4 style={{ color: 'blue' }}>
              <CoinIcon /> בונוס מעברי מוסד:
              {addShiftForm.institutions.length > 0
                ? util.fixNum((addShiftForm.institutions.length - 1) * 40)
                : 0}
            </h4>
          </div>
        )}
        <div>
          <h3 style={{ color: 'green' }}>
            <CoinIcon /> סכום סופי:{' '}
            {util.fixNum(addShiftForm.totalSumInstitutions + addShiftForm.baseSalary)}
          </h3>
          <h3 style={{ color: 'gray', paddingBottom: '3em' }}>
            <CoinIcon /> ממוצע לשעה :
            {util.fixNum(
              (addShiftForm.totalSumInstitutions + addShiftForm.baseSalary) /
                util.fromTimeStringToHours(addShiftForm.totalTime)
            )}
          </h3>
          <Button onClick={checkAllFields} style={{ marginBottom: '2em' }}>
            שמור יום עבודה
          </Button>
        </div>
      </div>
    </div>
  )
}


export default AddShift