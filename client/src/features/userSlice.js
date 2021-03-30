import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged:false,
    user:{

    }
  },
  
  reducers:{
    logUser:(state,action)=>{
      state.isLogged = true
      state.user = action.payload
    },
    logout:(state,action) =>{
      state.isLogged = false 
      state.user = { }
      localStorage.clear()
    }
  }
})

export const {logUser,logout} = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer
