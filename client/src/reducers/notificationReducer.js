import { FETCH_NOTIFICATIONS, FETCHED_NOTIFICATIONS } from  '../actions/types'

const initialState = {
  loading: false,
  notifications: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      }
    case FETCHED_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        notifications: action.payload
      }
    default:
      return state
  }
}
