import React, {Component} from 'react'
import {binder} from '../../utils'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    binder(this,['handleMouseDown', 'handleMouseUp'])
  }
  componentDidMount(){this.props.showControls()}
  handleMouseDown(e) {
    this.props.onMouseMove(e)
    this.props.onMouseDown(e)
  }
  handleMouseUp(e) {this.props.onMouseUp(e)}
  render() {
    const {valuenow, valuetext, duration, currentTime} = this.props
    const loc = `calc(${valuenow}% - 5px)`
    return (
      <div className='scrubber-container'onClick={this.props.showControls}>
        <div className="scrubber-slider">
          <div className='current-time'>{valuetext}</div>
          <div className="slidertrack slidertrack-scrubber"/>
          <div className="slidertrack-played" style={{width:loc}}/>
          <div className="sliderthumb sliderthumb-scrubber"
            onClick={this.props.showControls}
            style={{left:loc}}/>
          <input type='range' min="0" max={`${duration}`} step="1"
            className='slider' onChange={(e)=>{this.props.seekNewTime(e.target.value)}}
            value={currentTime}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleMouseDown}/>
        </div>
      </div>
    )
  }
}
