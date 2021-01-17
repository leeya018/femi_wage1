import React from 'react'

import '../styles/institution.css'

import CoinIcon from './CoinIcon'

export default function Institution({
  institutionName,
  sum,
  tests,
  index,
  rate,
}) {
  return (
    <tr>
      <td>
        <CoinIcon />
        {'   ' + sum}
      </td>
      <td>{rate}</td>
      <td>{tests}</td>
      <td>{institutionName}</td>
    </tr>
  )
}
//  <Card
//   border="primary"
//   bg={femi.institutions.length - 1 === index ? 'success' : ''}
// >
//   <Card.Body>
//     <Card.Title style={{ textDecoration: 'underline' }}>
//       {institutionName}
//     </Card.Title>
//     <Badge
//       className="remove-institution"
//       onClick={() => dispatch(removeInstitution(index))}
//       variant="danger"
//     >
//       X
//     </Badge>{' '}
