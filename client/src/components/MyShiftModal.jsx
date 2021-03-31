import React from 'react'
import { useSelector } from 'react-redux'
import util from '../util'
import List from './List'
import HourlyWage from './HourlyWage'


import { selectAddShiftForm } from '../features/addShiftFormSlice'
import { Modal, Button, Card } from 'react-bootstrap'


export default function MyShiftModal({ show, handleOnHide }) {
  let addShiftForm= useSelector(selectAddShiftForm)
  let { creationDate } = addShiftForm.salById
  let { baseHours, hoursPer125 } = addShiftForm.salById.hours
  let { institutions, total } = addShiftForm.salById

  return (
    <Modal
      show={show}
      onHide={handleOnHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{util.formatDate(creationDate)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>  
          <Card style={{ width: '18rem' , border:"none" }}>
            <Card.Header></Card.Header>
            <Card.Body>
              {/* <Card.Title>shift</Card.Title> */}
              <HourlyWage baseHours={baseHours} hoursPer125={hoursPer125} />
              <List institutions={institutions} hideTrash={true} />
              {institutions.length > 1 && (
                <h4>
                  בונוס מעברי מוסד: {`  ` + (institutions.length - 1) * 40}
                </h4>
              )}
              <h2>סכום כולל: {`  ` + total} שקלים</h2>
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
