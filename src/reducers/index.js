import { combineReducers } from 'redux';
import APIreducer from './reducer_api'
import SelectionsReducer from './reducer_selections'
import VideoReducer from './reducer_video'

const rootReducer = combineReducers({
  CSMdata: APIreducer,
  selections: SelectionsReducer,
  video: VideoReducer
})

export default rootReducer
