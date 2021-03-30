import { createSlice } from '@reduxjs/toolkit'

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    showAddShift:false,
    showBeforeModal: false,
    showConfirmedModal: false,
    showShiftModal: false,
    showMonthlySalaryModal: false,
  },
  reducers: {
    updateShowMonthlySalaryModal:(state,action)=>{
      return {...state,showMonthlySalaryModal:action.payload}
    },
    updateShowShiftModal:(state,action)=>{
      return {...state,showShiftModal:action.payload}
    },
    updateShowConfirmedModal:(state,action)=>{
      return {...state,showConfirmedModal:action.payload}
    },
    updateShowAddShift:(state,action)=>{
      return {...state,showAddShift:action.payload}
    },
    updateShowBeforeModal: (state, action) => {
      return {...state,showBeforeModal:action.payload}
    },
  },
})

export const { 
  updateShowShiftModal,
  updateBeforeConfirmModal,
  updateShowConfirmedModal,
  updateShowBeforeModal,
  updateShowMonthlySalaryModal,
  updateShowAddShift
 } = modalsSlice.actions

export const selectModals = (state) => state.modals

export default modalsSlice.reducer
