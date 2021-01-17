import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    data: '',
    confirm:false
  }

})

export const {} = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer
