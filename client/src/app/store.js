import {combineReducers, createStore  } from "redux"
import femiReducer from '../features/femiSlice'
import  messagesReducer from '../features/messagesSlice'
import  userReducer from '../features/userSlice'


let reducer =  combineReducers({
    femi: femiReducer,
    messages:messagesReducer,
    user:userReducer
})

export default createStore(reducer)