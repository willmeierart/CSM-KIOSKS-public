import {REHYDRATE} from 'redux-persist/constants'

export default function PERSIST(state={}, action){
  switch(action.type){
    case REHYDRATE:{
      return {...state, persistedState: action.payload}}
    default:
      return state
  }
}
