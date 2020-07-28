import axios from 'axios'
import {
  FETCH_USER,
  FETCH_REQ,
  FETCH_SREQ,
  LOADER_ON,
  LOADER_OFF,
  POST_TAG,
  FETCH_TAG,
  FETCH_QUERY,
  FETCH_TAGPOST,
  FETCH_TODAY,
  FETCH_RECOMMENDED,
  FETCH_REC_FILTERED,
  POST_ANSWER,
  POSTED_ANSWER,
  POSTING_ANSWER,
  FETCH_NOTIFICATIONS,
  FETCHED_NOTIFICATIONS,
  POST_COMMENT,
  POSTED_COMMENT,
  UPDATE_COMMENT,
  UPDATED_COMMENT,
  DELETE_COMMENT,
  DELETED_COMMENT,
  ACCEPT_ANSWER,
  ACCEPTED_ANSWER,
  LOADER_ASYNC_ON,
  LOADER_ASYNC_OFF,

} from './types'
import qs from 'qs'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitRequest = (values, history) => async dispatch => {
  const res = await axios.post('/api/translate', values)
  history.push('/translate')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchRequests = (page = 1) => async dispatch => {
  dispatch({ type: LOADER_ON })
  const res = await axios.get(`/api/translate?page=${page}`)
  dispatch({ type: FETCH_REQ, payload: res.data })
  dispatch({ type: LOADER_OFF })
}

export const fetchRequestsAsync = (page = 1) => async dispatch => {
  const res = await axios.get(`/api/translate?page=${page}`)
  dispatch({ type: FETCH_REQ, payload: res.data })
}

export const postAnswer = (translationId, answer) => async dispatch => {
  dispatch({ type: POSTING_ANSWER })
  await axios.post('/api/answers', { translationId, answer })
  const res = await axios.get(`/api/translate/view/${translationId}`)
  dispatch({ type: POSTED_ANSWER })
  dispatch({ type: FETCH_SREQ, payload: res.data })
}

export const postComment = (comment, answerId, translationId) => async dispatch => {
  dispatch({ type: POST_COMMENT })
  await axios.post('/api/comments', { comment, answerId })
  const res = await axios.get(`/api/translate/view/${translationId}`)
  dispatch({ type: POSTED_COMMENT })
  dispatch({ type: FETCH_SREQ, payload: res.data })
}

export const editComment = (commentId, comment, translationId) => async dispatch => {
  dispatch({ type: UPDATE_COMMENT, payload: commentId })
  await axios.patch('/api/comments/update', { commentId, comment })
  const res = await axios.get(`/api/translate/view/${translationId}`)
  dispatch({ type: UPDATED_COMMENT })
  dispatch({ type: FETCH_SREQ, payload: res.data })
}


export const deleteComment = (commentId, translationId) => async dispatch => {
  dispatch({ type: DELETE_COMMENT, payload: commentId })
  await axios.delete(`/api/comments/delete/${commentId}`)
  const res = await axios.get(`/api/translate/view/${translationId}`)
  dispatch({ type: DELETED_COMMENT })
  dispatch({ type: FETCH_SREQ, payload: res.data })
}

export const acceptAnswer = (answerId, translationId, context) => async dispatch => {
  dispatch({ type: ACCEPT_ANSWER, payload: answerId })
  await axios.patch(`/api/answers/accept`, { answerId, context })
  const res = await axios.get(`/api/translate/view/${translationId}`)
  dispatch({ type: ACCEPTED_ANSWER })
  dispatch({ type: FETCH_SREQ, payload: res.data })
}

export const fetchRequest = id => async dispatch => {
  dispatch({ type: LOADER_ON })
  const res = await axios.get(`/api/translate/view/${id}`)
  dispatch({ type: FETCH_SREQ, payload: res.data })
  dispatch({ type: LOADER_OFF })
}

export const fetchRequestAsync = id => async dispatch => {
  dispatch({ type: LOADER_ASYNC_ON })
  const res = await axios.get(`/api/translate/view/${id}`)
  dispatch({ type: LOADER_ASYNC_OFF })
  dispatch({ type: FETCH_SREQ, payload: res.data })

}

export const submitPref = (values, history) => async dispatch => {
  const res = await axios.post('/api/current_user', values)
  history.push('/translate')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSearch = (query, page = 1) => async dispatch => {
  dispatch({ type: LOADER_ON })
  const res = await axios.get(`/api/query/${query}?page=${page}`)
  dispatch({ type: FETCH_QUERY, payload: res.data })
  dispatch({ type: LOADER_OFF })
}

export const postTag = (values, history) => async dispatch => {
  const res = await axios.post('/api/tags', values)
  history.push('/')
  dispatch({ type: POST_TAG, payload: res.data })
}

export const fetchTags = () => async dispatch => {
  dispatch({ type: LOADER_ON })
  const res = await axios.get('/api/tags')
  dispatch({ type: FETCH_TAG, payload: res.data })
  dispatch({ type: LOADER_OFF })
}

export const fetchTagPosts = name => async dispatch => {
  dispatch({ type: LOADER_ON })
  const res = await axios.get(`/api/tagpost/${name}`)
  dispatch({ type: FETCH_TAGPOST, payload: res.data })
  dispatch({ type: LOADER_OFF })
}

export const fetchTodayList = (page = 1) => async dispatch => {
  dispatch({ type: LOADER_ON })
  const res = await axios.get(`/api/translate/today?page=${page}`)
  dispatch({ type: FETCH_TODAY, payload: res.data })
  dispatch({ type: LOADER_OFF })
}

export const fetchRecommendedList = (page = 1) => async dispatch =>  {
  dispatch({type: LOADER_ON})
  const res = await axios.get(`/api/translate/recommended?page=${page}`)
  dispatch({type: FETCH_RECOMMENDED, payload: res.data})
  dispatch({type: LOADER_OFF})
}


export const filterRecommendedList = (page = 1, languageSet ) => async dispatch => {
  const queryString = qs.stringify({languageSet})
  dispatch({type: LOADER_ON})
  const res = await axios.get(`/api/translate/recommended/${queryString}?page=${page}`)
  dispatch({type: FETCH_RECOMMENDED, payload: res.data})
  dispatch({type: LOADER_OFF})
}


export const fetchNotification = () => async dispatch => {
  dispatch({ type: FETCH_NOTIFICATIONS })
  const res = await axios.get('/api/notifications')
  dispatch({ type: FETCHED_NOTIFICATIONS, payload: res.data })
}

export const updateReadNotifications = (translationId) => async dispatch => {
  const res = axios.patch('/api/notifications', { translationId })

  dispatch({ type: FETCHED_NOTIFICATIONS, payload: res.data })

}