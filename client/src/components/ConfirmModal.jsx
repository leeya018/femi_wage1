import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import savedIcon from '../images/savedIcon.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAddShiftForm,
} from '../features/addShiftFormSlice'
import {
  updateShowAddShift,
  updateShowConfirmedModal,
  selectModals
} from '../features/modalsSlice'
export default function ConfirmModal() {
  let dispatch = useDispatch()
  let modals = useSelector(selectModals)
  let addShiftForm= useSelector(selectAddShiftForm)

  const closeModal = () => {
    dispatch(updateShowConfirmedModal(false))
    dispatch(updateShowAddShift(false))
  }
  return (
    <Modal
      style={{ background: 'gray' }}
      show={modals.showConfirmedModal}
      onHide={closeModal}
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
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
