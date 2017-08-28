import {FETCH_VIMEO_MP4, FETCH_CAPTIONS, PLAYBACK_INIT, CHANGE_VOLUME, SEEK_TIME, TOGGLE_PAUSE, CAPTIONS_ON, PREV_NEXT_VID} from '../actions'

const initialState={
  mp4:{},
  thumb:{},
  captionsOn:false,
  captionsAvail:false,
  captions:[],
  prevNextVid:[],
  playback:{
    currentTime:0,
    duration:0,
    seeking:false,
    seekingTime:0,
    volume:1,
    ended:false,
    textTracks:{},
    paused:false
  }
}

export default function VideoReducer(state=initialState, action){
  switch(action.type){
    case FETCH_VIMEO_MP4:{
      if(action.payload.data){
        const data=JSON.parse(action.payload.data.entire_json)
        let newState = {...state}
        newState.mp4 = data.HD
        newState.thumb = data.thumb
        if(data.captions!==undefined){newState.captionsAvail=true}
        else{
          newState.captions=[]
          newState.captionsAvail=false
        }
        return newState
      } else return state}
    case FETCH_CAPTIONS:{
      let newState = {...state}
      newState.captions = action.payload.data
      return newState}
    case PLAYBACK_INIT:{
      let newState = {...state}
      newState.playback = action.payload
      return newState}
    case CHANGE_VOLUME:{
      let newState = {...state}
      newState.playback.volume = action.payload
      return newState}
    case SEEK_TIME:{
      let newState = {...state}
      newState.playback.currentTime = action.payload
      return newState}
    case TOGGLE_PAUSE:{
      let newState = {...state}
      newState.playback.paused = action.payload?false:true
      return newState}
    case CAPTIONS_ON:{
      let newState = {...state}
      newState.captionsOn = action.payload
      return newState}
    case PREV_NEXT_VID:{
      let newState = {...state}
      newState.prevNextVid = action.payload
      return newState}
    default:
      return state
  }
}
