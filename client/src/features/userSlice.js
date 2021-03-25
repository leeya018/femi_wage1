import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {

  }

})

export const {} = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer
