import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {CC, Volume, Prev, Next} from '../Structure/icons'
import {FaChevronUp} from 'react-icons/lib/fa'
import {binder} from '../../utils'
import VolumeSlider from './VideoVolumeSlider'
import Scrubber from './VidTimeScrubber'

export default class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index:0,
      nextVid:{},
      prevVid:{},
      currentVid:{},
      showVolume:false
    }
    binder(this, ['prevVideo','nextVideo','selectVideo','mapDataToControls','showVolume','showControls'])
  }
  componentWillMount(){this.mapDataToControls(this.props.video.id)}

  selectVideo(vid){
    this.props.selectVid(vid)
    this.mapDataToControls(vid.id)
  }
  prevVideo(){
    const {prevVid} = this.state
    const {id} = prevVid
    this.props.selectVid(prevVid)
    this.mapDataToControls(id)
  }
  nextVideo(){
    const {nextVid} = this.state
    const {id} = nextVid
    this.props.selectVid(nextVid)
    this.mapDataToControls(id)
  }
  mapDataToControls(id){
    const videos = this.props.validVids
    const currentVid = videos.find((vid)=>{return vid.videoData[0].id===id})
    this.setState({currentVid:currentVid})
    const index = videos.indexOf(currentVid)
    const prevVid = index>0?videos[index-1]:null
    const nextVid = index<videos.length-1?videos[index+1]:null
    this.setState({
      index:index,
      prevVid:prevVid!==null?prevVid.videoData[0]:null,
      nextVid:nextVid!==null?nextVid.videoData[0]:null
    })
  }
  showControls(){
    this.props.showControls()
    this.props.controlsTimeout()
  }
  showVolume(){this.setState({showVolume:true})}
  render() {
    const category = this.props.category.title
    const exists=(thing)=> thing!==undefined && thing!==null
    return (
      <div className="video-controls"
        onClick={this.showControls}>
        <div className="video-controls-upper">
          <Scrubber {...this.props}
            showControls={this.showControls}/>
        </div>
        <div className="video-controls-lower">
          <span>
            {this.props.validVids.length > 1 &&
              <span className="prev-next-controls">
                {exists(this.state.prevVid) &&
                  <Link className="link"
                    onClick={(e)=>{this.selectVideo(this.state.prevVid)}}
                    to='/videos'
                    rel="prev">
                    <Prev prevVid={this.prevVideo}/>
                  </Link>
                }
                &nbsp; <strong>{parseInt(this.state.index,10)+1}</strong> / {this.props.validVids.length}&nbsp;
                {exists(this.state.nextVid) &&
                  <Link className="link"
                    to='/videos'
                    onClick={(e)=>{this.selectVideo(this.state.nextVid)}}
                    rel="next">
                    <Next nextVid={this.nextVideo}/>
                  </Link>
                }
              </span>
            }
            <span><span className="player-category">{category}: </span> {this.props.video.title}</span>
          </span>
          <span className="controls-right">
            <Link className="link back-link" to='/categories'> <FaChevronUp className="chevron-up"/> BACK TO TOPIC </Link>
            <span className="right-icons">
              <Volume showVolume={this.showVolume}/>
                {this.state.showVolume &&
                <VolumeSlider
                  showControls={this.showControls}
                  onClick={this.showVolume}
                  volume={this.props.playback.volume}
                  changeVolume={this.props.changeVolume}/>}
                {this.props.captionsAvail && <CC addCaptions={this.props.addCaptions}/>}
              </span>
          </span>
        </div>
      </div>
    )
  }
}
