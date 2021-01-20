import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import savedIcon from '../images/savedIcon.png'
import { useDispatch, useSelector } from 'react-redux'
import { updateShowAddShift } from '../features/femiSlice'
export default function ConfirmModal({ show, handleOnHide }) {
  let dispatch = useDispatch()

  const handleOnHide1 = () => {
    handleOnHide()
    dispatch(updateShowAddShift(false))
  }
  return (
    <Modal
      show={show}
      onHide={handleOnHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>נשמר בהצלחה</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img className="saved" src={savedIcon} alt="" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnHide1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
