import { combineReducers, createStore } from "redux"
import femiReducer from '../features/femiSlice'
import messagesReducer from '../features/messagesSlice'
import userReducer from '../features/userSlice'
import modalReducer from '../features/modalsSlice'
import calenderReducer from '../features/calenderSlice'

let reducer = combineReducers({
    femi: femiReducer,
    messages: messagesReducer,
    user: userReducer,
    modals: modalReducer,
    calender:calenderReducer,

    

})

export default createStore(reducer)