import { combineReducers, createStore } from "redux"
import femiReducer from '../features/femiSlice'
import messagesReducer from '../features/messagesSlice'
import userReducer from '../features/userSlice'
import modalReducer from '../features/modalsSlice'

let reducer = combineReducers({
    femi: femiReducer,
    messages: messagesReducer,
    user: userReducer,
    modals: modalReducer,

})

export default createStore(reducer)