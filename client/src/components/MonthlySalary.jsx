import React, { useEffect, useCallback } from 'react'
import api from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { selectFemi, updateMonthlyIncome } from '../features/femiSlice'
import { selectMessages, updateErrMessage } from '../features/messagesSlice'
import HourlyWage from './HourlyWage'
import RatesWage from './RatesWage'
import TotalSummery from './TotalSummery'
import { Form, Button } from 'react-bootstrap'

export default function MonthlySalary({ month,year, closeWindow }) {
  let dispatch = useDispatch()
  let today = new Date()
  let femi = useSelector(selectFemi)
  let messagesSelection = useSelector(selectMessages)

  const getSalaryByMonth = () => {
    let token = localStorage.getItem('token')
    let id_number = localStorage.getItem('id_number')

    api
      .getSalaryByMonth(month,year, id_number, token)
      .then((res) => {
        dispatch(updateMonthlyIncome(res.data))
        dispatch(updateErrMessage(''))
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          dispatch(updateErrMessage(err.response.data.message))
          console.log(err.response.data.message)
        } else {
          console.log(err.message)
          dispatch(updateErrMessage(err.message))
        }
      })
  }

  useEffect(() => {
    console.log('this is first useEffect')
    getSalaryByMonth(month)
    console.log('there is a refresh for ref')
  }, [])
  let { baseHours, hoursPer125 } = femi.monthlyIncome.hours || {}
  let { totalWageByCategory, totalWage, rates } = femi.monthlyIncome
  return (
    <div>
      <Button variant="secondary" onClick={closeWindow}>
        סגור
      </Button>
      {messagesSelection.errMessage ? (
        <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
      ) : (
        <div>
          {baseHours && (
            <div>
              <h1>משכורת : {`${month + 1}/2021`}</h1>
              <HourlyWage baseHours={baseHours} hoursPer125={hoursPer125} />
              <RatesWage rates={rates} />
              <TotalSummery
                totalWageByCategory={totalWageByCategory}
                totalWage={totalWage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
