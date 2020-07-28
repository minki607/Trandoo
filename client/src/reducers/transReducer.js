import {
  FETCH_REQ,
  FETCH_SREQ,
  FETCH_QUERY,
  LOADER_ON,
  LOADER_OFF,
  FETCH_TODAY,
  FETCH_RECOMMENDED,
  POST_ANSWER,
  POSTED_ANSWER,
  POSTING_ANSWER,
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
  FETCH_REC_FILTERED,

} from '../actions/types'

const initialState = {
  data: [], //multiple requests
  single: [], //single request
  query: [], //for search query request
  today: [], //for request posted today
  recommend: [],
  loading: true, //fetch data status
  answerLoading: false, // posting answer indicator
  commentLoading: false,
  acceptLoading: false,
  currentAcceptAnswer: null,
  currentComment: null,
  loadingAsyncRequest: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REQ:
      return {
        ...state,
        data: action.payload
      }
    case FETCH_SREQ:
      return {
        ...state,
        single: action.payload,
        answerLoading: false
      }
    case FETCH_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case FETCH_TODAY:
      return {
        ...state,
        today: action.payload
      }
    case FETCH_RECOMMENDED:
      return {
        ...state,
        recommend: action.payload
      }  
      case FETCH_REC_FILTERED:
      return {
        ...state,
        filtered: action.payload
      }  
  
    case LOADER_ON:
      return {
        ...state,
        loading: true
      }
    case LOADER_OFF:
      return {
        ...state,
        loading: false
      }

    case LOADER_ASYNC_ON:
      return {
        ...state,
        loadingAsyncRequest: true
      }
    case LOADER_ASYNC_OFF:
      return {
        ...state,
        loadingAsyncRequest: false
      }
    case POST_ANSWER:
      return {
        ...state,
        single: action.payload
      }
    case POSTING_ANSWER:
      return {
        ...state,
        answerLoading: true
      }
    case POSTED_ANSWER:
      return {
        ...state,
        answerLoading: false
      }
    case POST_COMMENT:
    case UPDATE_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        commentLoading: true,
        currentComment: action.payload
      }
    case POSTED_COMMENT:
    case UPDATED_COMMENT:
    case DELETED_COMMENT:
      return {
        ...state,
        commentLoading: false,
        currentComment: null
      }
    case ACCEPT_ANSWER:
      return {
        ...state,
        acceptLoading: true,
        currentAcceptAnswer: action.payload
      }
    case ACCEPTED_ANSWER:
      return {
        ...state,
        acceptLoading: false,
        currentAcceptAnswer: null
      }
    default:
      return state
  }
}
