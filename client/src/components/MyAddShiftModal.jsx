import React from 'react'
import { useSelector } from 'react-redux'
import util from '../util'
import List from './List'
import HourlyWage from './HourlyWage'
import AddShift from './AddShift'

import { selectAddShiftForm } from '../features/addShiftFormSlice'
import { Modal, Button, Card } from 'react-bootstrap'

export default function MyAddShiftModal({
  creationDate,
  show,
  handleOnHide,
}) {
  let addShiftForm= useSelector(selectAddShiftForm)

  return (
    <Modal
      show={show}
      onHide={handleOnHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{util.formatDateObjToStr(creationDate)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card style={{ width: '18rem', border: 'none', margin: 'auto' }}>
            <Card.Header></Card.Header>
            <Card.Body>
              <AddShift
                creationDate={creationDate}
              />
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
