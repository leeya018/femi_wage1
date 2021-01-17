import React, { useEffect, useCallback } from 'react'
import api from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { selectFemi, updateMonthlyIncome } from '../features/femiSlice'
import { selectMessages, updateErrMessage } from '../features/messagesSlice'
import HourlyWage from './HourlyWage'
import RatesWage from './RatesWage'
import TotalSummery from './TotalSummery'
import { Form } from 'react-bootstrap'

let month = 1
export default function MonthlySalary() {
  let dispatch = useDispatch()
  let today = new Date()
  let femi = useSelector(selectFemi)
  let messagesSelection = useSelector(selectMessages)

  const getSalaryByMonth = (chosenMonth) => {
    month = chosenMonth
    let token = localStorage.getItem('token')
    let id_number = localStorage.getItem('id_number')

    api
      .getSalaryByMonth(chosenMonth - 1, id_number, token)
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
    getSalaryByMonth(1)
    console.log('there is a refresh for ref')
  }, [])
  let { baseHours, hoursPer125 } = femi.monthlyIncome.hours || {}
  let { totalWageByCategory, totalWage, rates } = femi.monthlyIncome
  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Control
            custom
            onChange={(e) => getSalaryByMonth(e.target.value)}
            as="select"
            size="lg"
          >
            <option value={1}>ינואר-1</option>
            <option value={2}>פברואר-2</option>
            <option value={3}>מרץ-3</option>
            <option value={4}>אפריל-4</option>
            <option value={5}>מאי-5</option>
            <option value={6}>יוני-6</option>
            <option value={7}>יולי-7</option>
            <option value={8}>אוגוסט-8</option>
            <option value={9}>ספטמבר-9</option>
            <option value={10}>אוקטובר-10</option>
            <option value={11}>נובמבר-11</option>
            <option value={12}>דצמבר-12</option>
          </Form.Control>
        </Form.Group>
      </Form>

      {messagesSelection.errMessage ? (
        <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
      ) : (
        <div>
          {baseHours && (
            <div>
              <h1>משכורת : {`${month}/2021`}</h1>
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
