import {FETCH_CSM_DATA} from '../actions'

export default function APIreducer(state=[], action){
  switch(action.type){
    case FETCH_CSM_DATA:
      return action.payload.data
    default:
      return state
  }
}
