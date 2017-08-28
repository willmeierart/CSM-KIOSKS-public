import React, {Component} from 'react'

export default class VolumeSlider extends Component {
  render() {
    const volPercent = this.props.volume*100
    return (
      <div className="volume-container">
        <div className="volume-slider">
          <div className="sliderfill sliderfill-volume"/>
          <div className="slidertrack slidertrack-volume"/>
          <div className="sliderthumb sliderthumb-volume"
              // onClick={this.props.showControls}
              style={{left:`calc(${volPercent}% - 10px )`}}/>
          <input type='range' min="0" max="1" step=".1"
            onChange={(e)=>{this.props.changeVolume(parseFloat(e.target.value))}}
            value={this.props.volume}
            className='slider'/>
        </div>
      </div>
    )
  }
}
