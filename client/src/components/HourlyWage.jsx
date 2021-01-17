import React from 'react'
import '../styles/hourlyWage.css'
import { Table } from 'react-bootstrap'
import util from '../util'
import CoinIcon from './CoinIcon'

export default function HourlyWage({ baseHours, hoursPer125 }) {
  return (
    <>
      <h1>שעות עבודה</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>סכום לתשלום</th>
            <th>כמות</th>
            <th>שעות עבודה</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CoinIcon />
              {'  ' + util.fixNum(baseHours.baseWage)}
            </td>
            <td>{parseInt(baseHours.amount)}</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>
              <CoinIcon />
              {'  ' + util.fixNum(hoursPer125.wageFor125)}
            </td>
            <td>{parseInt(hoursPer125.amount)}</td>
            <td>125%</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
