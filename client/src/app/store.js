import {combineReducers, createStore  } from "redux"
import femiReducer from '../features/femiSlice'
import  messagesReducer from '../features/messagesSlice'

let reducer =  combineReducers({
    femi: femiReducer,
    messages:messagesReducer,
})

export default createStore(reducer)