import axios from 'axios'
import {FETCH_USER, FETCH_REQ, FETCH_SREQ, LOADER_ON, LOADER_OFF, POST_TAG, FETCH_TAG, FETCH_QUERY, FETCH_TAGPOST, FETCH_TODAY} from "./types";

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

export const fetchRequests = (page = 1) => async dispatch => {

    dispatch({type: LOADER_ON})
    const res = await axios.get(`/api/translate?page=${page}`)
    dispatch({type: FETCH_REQ, payload: res.data})
    dispatch({type: LOADER_OFF})
}   

export const fetchRequest = (id) => async dispatch => {

    dispatch({type: LOADER_ON})
    const res = await axios.get(`/api/translate/view/${id}`)
    dispatch({type: FETCH_SREQ, payload: res.data})
    dispatch({type: LOADER_OFF})

}

export const submitPref = (values, history) => async dispatch =>{
  
    const res = await axios.post('/api/current_user', values)
    history.push('/translate')
    dispatch({type: FETCH_USER, payload: res.data})
}

export const submitSearch = (query, page = 1) => async dispatch => {
    dispatch({type: LOADER_ON})
    const res = await axios.get(`/api/query/${query}?page=${page}`)
    dispatch({type: FETCH_QUERY, payload: res.data})
    dispatch({type: LOADER_OFF})
}


export const postTag = (values, history) => async dispatch =>{
    const res = await axios.post('/api/tags', values)
    history.push('/')
    dispatch({type: POST_TAG, payload: res.data})
}

export const fetchTags = () => async dispatch => {

    dispatch({type: LOADER_ON})
    const res = await axios.get('/api/tags')
    dispatch({type: FETCH_TAG, payload: res.data})
    dispatch({type: LOADER_OFF})
}

export const fetchTagPosts = (name) => async dispatch => {

        dispatch({type: LOADER_ON})
        const res = await axios.get(`/api/tagpost/${name}`)
        dispatch({type: FETCH_TAGPOST, payload: res.data})
        dispatch({type: LOADER_OFF})
    
}

export const fetchTodayList = (page = 1) => async dispatch =>  {
    dispatch({type: LOADER_ON})
    const res = await axios.get(`/api/translate/today?page=${page}`)
    dispatch({type: FETCH_TODAY, payload: res.data})
    dispatch({type: LOADER_OFF})
}