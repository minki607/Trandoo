import axios from 'axios'
import {FETCH_USER, FETCH_REQ, FETCH_SREQ, LOADER_ON, LOADER_OFF} from "./types";

export const fetchUser = () => async (dispatch) => {
        const res = await axios.get('/api/current_user')
        dispatch({type: FETCH_USER, payload: res.data})
    }

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({type: FETCH_USER, payload:res.data})
}

export const submitRequest = (values, history) => async dispatch =>{
    const res = await axios.post('/api/translate', values)
    history.push('/translate')
    dispatch({type: FETCH_USER, payload: res.data})
}

export const fetchRequests = () => async dispatch => {

    dispatch({type: LOADER_ON})
    const res = await axios.get('/api/translate')
    dispatch({type: FETCH_REQ, payload: res.data})
    dispatch({type: LOADER_OFF})
}   

export const fetchRequest = (id) => async dispatch => {

    const res = await axios.get(`/api/translate/view/${id}`)
    dispatch({type: FETCH_SREQ, payload: res.data})

}

export const submitPref = (values, history) => async dispatch =>{
  
    const res = await axios.post('/api/current_user', values)
    history.push('/translate')
    dispatch({type: FETCH_USER, payload: res.data})
}
