import {combineReducers} from "redux";
import {reduxForm} from "redux-form";
import authReducer from "./authReducer";
import langReducer from "./langReducer";

export default combineReducers({
    auth: authReducer,
    lang: langReducer,
    form: reduxForm
})