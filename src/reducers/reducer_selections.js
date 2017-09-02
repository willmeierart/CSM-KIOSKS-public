import {SELECT_KIOSK_SET, SELECT_CATEGORY, SELECT_VIDEO} from '../actions'

const initialState = {
  set:{
    set:{
      categories:[{category:{
        title:'',
        videos:[]
      }}]
    }
  },
  category:{},
  video: {}
}

export default function SelectionsReducer(state=initialState, action){
  switch(action.type){
    case SELECT_KIOSK_SET:{
      const newState = {...state}
      newState.set = action.payload
      return newState}
    case SELECT_CATEGORY:{
      const newState = {...state}
      newState.category = action.payload
      return newState}
    case SELECT_VIDEO:{
      const newState = {...state}
      newState.video = action.payload
      return newState}
    default:
      return state
  }
}
