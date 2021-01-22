import React from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { selectMessages } from '../features/messagesSlice'

export default function ConfirmModalBefore({
  InstitutionsLen,
  errMessage,
  show,
  handleOnHide,
  addDayInfo,
}) {
  let messagesSelection = useSelector(selectMessages)
  return (
    <Modal
      style={{ background: 'gray' }}
      show={show}
      onHide={handleOnHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>התראה!!!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <b> במידה ותשמור , לא תוכל לשנות את המשמרת יותר</b>
          </p>
          <div style={{ color: 'red' }}>{messagesSelection.errMessage}</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={addDayInfo}>
            שמור
          </Button>
          <Button variant="secondary" onClick={handleOnHide}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
