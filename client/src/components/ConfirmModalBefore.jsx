import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { selectMessages } from '../features/messagesSlice'
import { selectFemi, updateBeforeConfirmModal, updateShowAddShift } from '../features/femiSlice'

export default function ConfirmModalBefore({
  show,
  handleOnHide,
  InstitutionsLen,
  errMessage,
  addDayInfo,
}) {
  let messagesSelection = useSelector(selectMessages)

  // let dispatch = useDispatch()
  // let femi = useSelector(selectFemi)

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
