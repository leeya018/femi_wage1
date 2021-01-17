import React from 'react'
import '../styles/rateWage.css'
import util from '../util'
import { Table } from 'react-bootstrap'
import CoinIcon from "./CoinIcon"

export default function RatesWage({ rates }) {
  return (
    <>
      <h1>דגימות</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>סכום לתשלום</th>
            <th>כמות</th>
            <th>תעריף דגימות</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates)
            .filter((key) => rates[key].amount !== 0)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((key) => {
              return (
                <tr key={key}>
                  <td>
                    <CoinIcon />
                    {`  ` + rates[key].wage}
                  </td>
                  <td>{rates[key].amount}</td>
                  <td>{util.fromLineToDot(key)}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}
