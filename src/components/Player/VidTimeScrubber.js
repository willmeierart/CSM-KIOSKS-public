import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import * as Dom from '../../utils/dom'
import {binder, formatTime} from '../../utils'
import Slider from './VidTimeScrubSlider'

export default class Scrubber extends Component {
  constructor(props) {
    super(props)
    binder(this,['getPercent','getNewTime', 'handleMouseDown', 'handleMouseUp', 'handleMouseMove','calculateDistance'])
  }
  calculateDistance(e) {
    const node = findDOMNode(this)
    const position = Dom.getPointerPosition(node, e)
    return position.x
  }
  getPercent() {
    const { currentTime, seekingTime, duration } = this.props.playback
    const time = seekingTime || currentTime
    const percent = time / duration
    return percent >= 1 ? 1 : percent
  }
  getNewTime(e) {
    const {duration,currentTime} = this.props.playback
    const distance =  this.calculateDistance(e)
    let newTime = currentTime
    !isNaN(distance) ? newTime=distance*duration : newTime
    return newTime === duration  ? newTime - 0.1 : newTime
  }
  handleMouseDown() {
    const {playback, pause} = this.props
    this.videoWasPlaying = !playback.paused
    pause(false)
  }
  handleMouseUp(e) {
    const {playback:{paused},pause,seekNewTime} = this.props
    const time = this.getNewTime(e)
    seekNewTime(time)
    pause(paused)
  }
  handleMouseMove(e) {
    const {seekNewTime} = this.props
    const time = this.getNewTime(e)
    seekNewTime(time)
  }
  render() {
    const {seekingTime, currentTime, duration} = this.props.playback
    const time = seekingTime || currentTime
    return (
      <Slider
        showControls={this.props.showControls}
        duration={duration}
        currentTime={currentTime}
        valuenow={(this.getPercent() * 100).toFixed(2)}
        valuetext={formatTime(time, duration)}
        seekNewTime={this.props.seekNewTime}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      />
    )
  }
}
