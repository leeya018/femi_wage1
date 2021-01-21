import React from 'react'
import { useSelector } from 'react-redux'
import util from '../util'
import List from './List'
import HourlyWage from './HourlyWage'
import AddShift from './AddShift'

import { selectFemi } from '../features/femiSlice'
import { Modal, Button, Card } from 'react-bootstrap'

export default function MyAddShiftModal({
  showConfirmationModal,
  updateShowConfirmationModal,
  creationDate,
  show,
  handleOnHide,
}) {
  let femi = useSelector(selectFemi)

  return (
    <Modal
      show={show}
      onHide={handleOnHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{creationDate.toString()}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card style={{ width: '18rem', border: 'none' }}>
            <Card.Header></Card.Header>
            <Card.Body>
                "fkljfklasdjkfdas"
              <AddShift
                showConfirmationModal={showConfirmationModal}
                updateShowConfirmationModal={updateShowConfirmationModal}
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
