import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    errMessage: '',
    timeErrMessage: '',
    successMessage: '',
    time: '',
  },
  reducers: {
    updateErrMessage: (state, action) => {
      return {...state,errMessage:action.payload}

    },
    updateTimeErrMessage: (state, action) => {
      return {...state,timeErrMessage:action.payload}
    },
    updateSuccessMessage: (state, action) => {
      return {...state,successMessage:action.payload }
    },
  },
})

export const { updateErrMessage, updateTimeErrMessage,updateSuccessMessage } = messagesSlice.actions

export const selectMessages = (state) => state.messages

export default messagesSlice.reducer
