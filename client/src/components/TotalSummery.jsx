import React from 'react'
import { Table, Badge } from 'react-bootstrap'
import CoinIcon from './CoinIcon'
export default function TotalSummery({ totalWageByCategory, totalWage }) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>סכום לתשלום</th>
            <th>קטגוריה</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CoinIcon />
              {'  ' + totalWageByCategory.base}
            </td>
            <td>שכר בסיס</td>
          </tr>
          <tr>
            <td>
              <CoinIcon />
              {'  ' + totalWageByCategory.jumpsBetweenInstitutions}
            </td>
            <td>מעבר מוסדות</td>
          </tr>
          <tr>
            <td>
              <CoinIcon />
              {'  ' + totalWageByCategory.tests}
            </td>
            <td>דגימות</td>
          </tr>
        </tbody>
      </Table>
      <>
        <h2>
          <CoinIcon />
          <Badge variant="info">סך הכל לתשלום: {totalWage}</Badge>
        </h2>
      </>
    </>
  )
}
