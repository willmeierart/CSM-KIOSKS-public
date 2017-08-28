import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Player, LoadingSpinner } from 'video-react'
// import ScrollLock from 'react-scrolllock'
import { fetchVimeoMP4, fetchCaptions, selectVideo, playbackInit, seekTime, togglePause, captionsOn, prevNextVid } from '../actions'
import { binder, URLformat } from '../utils'
import Controls from '../components/Player/FullScreenPlayerControls'
import PlayPause from '../components/Player/PlayPause'
import '../styles/video.css'

let timer
let timer2

class FullScreenPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = { showControls: true, fade2black:true, textTrack:{kind:{},lang:{},src:{}},captionsOn:false}
    binder(this, ['seekNewTime', 'handleStateChange', 'selectVid','toggleCaptions', 'addCaptions',  'showControls', 'controlsTimeout', 'blackoutTimeout', 'playVid', 'pauseVid','toggleControls'])
  }
  componentWillMount() {
    this.props.onFetchVimeoMP4(this.props.selections.video.id)
  }
  componentWillUnmount(){
    if(timer){clearTimeout(timer)}
    this.props.showHeader()
  }
  componentDidMount() {
    const { actions } = this.refs.player
    // const {id} = this.props.selections.video
    if(!this.props.data.video.mp4){
      if(this.props.category){
        this.props.history.push( `/categories/${URLformat(this.props.category.title)}`)
      } else {this.props.history.push('/')}
    }
    this.toggleControls()
    this.blackoutTimeout()
    this.refs.player.subscribeToStateChange(this.handleStateChange)
    const disableFuncs = (Fs) => Fs.forEach(f => this.refs.player.actions[f] = () => null)
    disableFuncs(['toggleFullscreen', 'toggleFullscreenChange', 'handleFullscreenChange'])
    actions.handleEnd=()=>{
      this.props.history.push(`/categories/${URLformat(this.props.category.title)}`)
    }
  }
  componentWillReceiveProps(newProps,props){
    if(newProps.selections.video.id!==this.props.selections.video.id){
      this.selectVid(newProps.selections.video)
    }
  }
  handleStateChange(state, prevState) {
    this.props.onPlaybackInit({
      duration: state.duration,
      currentTime: state.currentTime,
      seeking: state.seeking,
      seekingTime: state.seekingTime,
      ended: state.ended,
      textTracks: state.textTracks,
      volume: state.volume,
      paused: state.paused
    })
  }
  blackoutTimeout(){
    this.setState({fade2black:true})
    if (timer2) { clearTimeout(timer2) }
    timer2 = setTimeout(() => {
      this.setState({})
      this.setState({fade2black:false})
    }, 1320)
  }
  controlsTimeout() {
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(() => {
      if(this.props.navOpen===false ){
        this.props.hideHeader()
      }
      this.setState({ showControls: false })
    }, 5000)
    return timer
  }
  showControls() {
    if (timer) { clearTimeout(timer) }
    this.props.showHeader()
    this.setState({ showControls: true })
  }
  toggleControls(){
    this.showControls()
    this.controlsTimeout()
  }
  selectVid(vid) {
    this.blackoutTimeout()
    this.props.onFetchVimeoMP4(vid.id)
    this.props.onSelectVideo(vid)
  }
  seekNewTime(time) {
    this.toggleControls()
    this.refs.player.video.seek(time)
  }
  playVid() {
    this.toggleControls()
    this.refs.player.actions.play()
    this.props.onTogglePause()
  }
  pauseVid() {
    this.toggleControls()
    this.refs.player.actions.pause()
    this.props.onTogglePause()
  }
  toggleCaptions(){
    this.props.onCaptionsOn(this.props.data.video.captionsOn ? false : true)
  }
  addCaptions(){
    const { captions } = this.props.data.video
    const { video } = this.refs.player.video
    const {id} = this.props.data.selections.video
    if(typeof this.state.textTrack.src !== 'string' && captions.data){
      this.props.onFetchCaptions(id)
      const track = captions.data[0]
      const textTrack = {kind:track.type,src:track.link,lang:track.language}
      if(video.textTracks){if(video.textTracks[0]){
        video.textTracks[0].mode==="hidden"  ? video.textTracks[0].mode = "showing" : video.textTracks[0].mode==="hidden"
          this.setState({textTrack:textTrack, captionsOn:true})
      }}
      this.setState({captionsOn:this.state.captionsOn ? false : true})
    } else {
      if(video.textTracks[0]){
        video.textTracks[0].mode==="showing"  ? video.textTracks[0].mode = "hidden" : video.textTracks[0].mode = "showing"
      }
    }
  }
  filterValid(arr) {
    const validVids = []
    for (let i of arr) {
      if (i.videoData !== undefined) {
        validVids.push(i)
      }
    }
    return validVids
  }
  render() {
    let actions = {}
    this.refs.player ? actions = this.refs.player.actions : actions
    const { captions } = this.props.data.video
    const {captionsAvail}= this.props.data.video
    const { playback } = this.props.data.video
    const validVids = this.filterValid(this.props.category.videos)
    const { mp4 } = this.props.data.video
    const {textTrack} = this.state
    return (
      <div>
        <ReactCSSTransitionGroup
            component="div"
            transitionName="bg-fade"
            transitionEnterTimeout={660}
            transitionLeaveTimeout={660}
            transitionAppearTimeout={660}
            transitionAppear={true}>
          {this.state.fade2black &&
            <div className="blackout veil"/>}
        </ReactCSSTransitionGroup>
        <div className="blackout bg"></div>
        <div className="fve-video-wrapper fve-image-embed fve-thumbnail-image video-padding">
          <div className="clickable-layer"
            onClick={this.toggleControls}/>
            <PlayPause
              showControls={this.state.showControls}
              playback={playback}
              play={this.playVid}
              pause={this.pauseVid}/>
            <Player ref='player'
              poster={this.props.thumb}
              captions={captions} src={mp4.link} autoPlay
              crossOrigin="anonymous">
              <track
                id="track"
                className="text-track"
                label="default"
                kind={textTrack.kind}
                srcLang={textTrack.lang}
                src={textTrack.src}
                default/>
              <LoadingSpinner/>
            </Player>
          <ReactCSSTransitionGroup component='div'
              className='controls-animation-wrapper'
              transitionName="controls-fade"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppearTimeout={1000}
              transitionAppear={true}>
          {this.state.showControls &&
           <Controls
              className="video-controls"
              showControls={this.showControls}
              controlsTimeout={this.controlsTimeout}
              selectVid={this.selectVid}
              changeVolume={actions.changeVolume}
              seekNewTime={this.seekNewTime}
              category={this.props.category}
              validVids={validVids}
              pause={this.props.onTogglePause}
              video={this.props.video}
              captionsAvail={captionsAvail}
              addCaptions={this.addCaptions}
              captionsOn={this.state.captionsOn}
              toggleCaptions={this.toggleCaptions}
              playback={playback}/>}
            <div className="controls-scrim"/>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => { return { data: state } }
const mapDispatchToProps = dispatch => {
  return {
    onFetchVimeoMP4: id => { dispatch(fetchVimeoMP4(id)) },
    onSelectVideo: vid => { dispatch(selectVideo(vid)) },
    onPlaybackInit: config => { dispatch(playbackInit(config)) },
    onSeekTime: newTime => { dispatch(seekTime(newTime)) },
    onTogglePause: bool => { dispatch(togglePause(bool)) },
    onCaptionsOn: bool => { dispatch(captionsOn(bool)) },
    onFetchCaptions: id => { dispatch(fetchCaptions(id)) },
    onPrevNextVid: vid => { dispatch(prevNextVid(vid)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FullScreenPlayer))
