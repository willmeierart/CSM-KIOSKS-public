import axios from 'axios'

export const FETCH_CSM_DATA = 'fetch_csm_data'
export const FETCH_VIMEO_MP4 = 'fetch_vimeo_mp4'
export const FETCH_CAPTIONS = 'fetch_captions'
export const SELECT_KIOSK_SET = 'select_kiosk_set'
export const SELECT_CATEGORY = 'select_category'
export const SELECT_VIDEO = 'select_video'
export const PLAYBACK_INIT = 'playback_init'
export const CHANGE_VOLUME = 'change_volume'
export const SEEK_TIME = 'seek_time'
export const TOGGLE_PAUSE = 'toggle_pause'
export const CAPTIONS_ON = 'captions_on'
export const PREV_NEXT_VID = 'prev_next_vid'

const PROXY_URL = 'https://csm-proxy-v2.herokuapp.com/'

export function fetchCSMdata(){
  const getVideoData=(id)=>{
    const vimSplit = id.split('/')
    const ID = vimSplit[vimSplit.length-1]
    const VIMEO_DATA_URL = `https://vimeo.com/api/v2/video/${ID}.json`
    return axios.get(VIMEO_DATA_URL)
  }
  const request = axios.get(PROXY_URL)
  .then(res=>{
    return Promise.all(res.data.map((set)=>{
      return Promise.all(set.set.categories.map((category)=>{
        return Promise.all(category.category.videos
          .filter(vid=>vid.video.vimeoid)
          .map((video)=>{
            return getVideoData(video.video.vimeoid).then(res=>{
              video.videoData = res.data
            })
        }))
      }))
    })).then(()=>{return res})
  })
  return {
    type: FETCH_CSM_DATA,
    payload: request
  }
}

export function fetchVimeoMP4(id){
  const request = axios.get(`${PROXY_URL}video/${id}`).then(res=>res)
  return {
    type: FETCH_VIMEO_MP4,
    payload:request
  }
}
export function fetchCaptions(id){
  const request = axios.get(`${PROXY_URL}video/${id}/captions`).then(res=>res)
  return {
    type: FETCH_CAPTIONS,
    payload:request
  }
}

export function selectKioskSet(set){
  return{
    type:SELECT_KIOSK_SET,
    payload: set
  }
}
export function selectCategory(cat){
  return{
    type:SELECT_CATEGORY,
    payload: cat
  }
}
export function selectVideo(vid){
  return{
    type:SELECT_VIDEO,
    payload: vid
  }
}
export function playbackInit(config){
  return{
    type:PLAYBACK_INIT,
    payload:config
  }
}
export function changeVolume(newVol){
  return{
    type:CHANGE_VOLUME,
    payload:newVol
  }
}
export function seekTime(newTime){
  return{
    type:SEEK_TIME,
    payload:newTime
  }
}
export function togglePause(bool){
  return{
    type:TOGGLE_PAUSE,
    payload:bool
  }
}
export function captionsOn(bool){
  return{
    type:CAPTIONS_ON,
    payload:bool
  }
}
export function prevNextVid(vid){
  return{
    type:PREV_NEXT_VID,
    payload:vid
  }
}
