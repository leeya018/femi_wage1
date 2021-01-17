import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import femiReducer from '../features/femiSlice'
import  messagesReducer from '../features/messagesSlice'
import  userReducer from '../features/userSlice'

// import userReducer from '../features/userSlice';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})

export default configureStore({
  reducer: {
    femi: femiReducer,
    messages:messagesReducer,
    user:userReducer,

  },
  middleware: customizedMiddleware,
})
