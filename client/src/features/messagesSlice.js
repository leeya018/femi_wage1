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
      state.errMessage = action.payload
    },
    updateTimeErrMessage: (state, action) => {
      state.timeErrMessage = action.payload
    },
    updateSuccessMessage: (state, action) => {
      state.successMessage = action.payload
    },
  },
})

export const { updateErrMessage, updateTimeErrMessage,updateSuccessMessage } = messagesSlice.actions

export const selectMessages = (state) => state.messages

export default messagesSlice.reducer
