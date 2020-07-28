import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import authReducer from "./authReducer"
import transReducer from "./transReducer"
import tagReducer from "./tagReducer"
import notificationReducer from './notificationReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    trans: transReducer,
    tag: tagReducer,
    notification: notificationReducer
})