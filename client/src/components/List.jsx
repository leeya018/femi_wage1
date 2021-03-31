import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAddShiftForm } from '../features/addShiftFormSlice'
import Institution from './Institution'
import util from '../util'
import { Table } from 'react-bootstrap'
import { clearAllInstitutions } from '../features/addShiftFormSlice'

export default function List({ institutions, hideTrash }) {
  let addShiftForm= useSelector(selectAddShiftForm)
  let dispatch = useDispatch()

  return (
    <div>
      {institutions.length > 0 && (
        <>
          {!hideTrash && (
            <div onClick={() => dispatch(clearAllInstitutions())}>
              <span>מחק מוסדות</span>
              <i className="fa fa-trash"></i>
            </div>
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>סכום לתשלום</th>
                <th>תעריף</th>
                <th>מספר בדיקות</th>
                <th>שם מוסד</th>
              </tr>
            </thead>
            <tbody>
              {[...institutions].reverse().map((institution, index) => (
                <Institution
                  institutionName={institution.institutionName}
                  tests={institution.tests}
                  key={index}
                  sum={institution.sum}
                  rate={
                    addShiftForm.isFriday
                      ? util.fridayRate
                      : util.rateTable[institution.index]
                  }
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}
