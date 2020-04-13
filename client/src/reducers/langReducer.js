import {FETCH_LANG} from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_LANG:
            return action.payload
        default:
            return state
    }
}