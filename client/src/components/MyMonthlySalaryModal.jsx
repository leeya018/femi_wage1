import React from 'react'
import { useSelector } from 'react-redux'
import util from '../util'
import List from './List'
import HourlyWage from './HourlyWage'
import MonthlySalary from './MonthlySalary'
import { selectAddShiftForm } from '../features/addShiftFormSlice'
import { Modal, Button, Card } from 'react-bootstrap'

export default function MyMonthlySalaryModal({
  month,
  year,
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

        <Modal.Body>
          <Card style={{ width: '18rem', border: 'none' }}>
            <Card.Header></Card.Header>
            <Card.Body>
              <MonthlySalary
                month={month}
                year={year}
                closeWindow={handleOnHide}
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
