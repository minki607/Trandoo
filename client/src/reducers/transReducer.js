import { FETCH_REQ, FETCH_SREQ, FETCH_QUERY, LOADER_ON, LOADER_OFF, FETCH_TODAY } from '../actions/types'

const initialState = {
    data: [], //multiple requests
    single: [], //single request 
    query: [], //for search query request
    today: [], //for request posted today
    loading: false //fetch data status
}
export default function(state = initialState, action){
    switch (action.type){
        case FETCH_REQ:
            return {
                ...state,
                data: action.payload
            }
        case FETCH_SREQ: 
            return {
                ...state,
                single: action.payload
            }    
        case FETCH_QUERY:
            return{
                ...state,
                query: action.payload
            }    
        case FETCH_TODAY:
            return{
                ...state,
                today: action.payload
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
        default:
            return state    
    }
  
}