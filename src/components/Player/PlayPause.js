import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { PlayBtn, PauseBtn } from '../Structure/icons'

export default class PlayPause extends Component {
  render() {
    // const disappearStyle=this.props.showControls?{}:{display:'none'}
    return (
      <ReactCSSTransitionGroup
        component='div'
        className='PlayPauseBtn'
        transitionName="btn-fade"
        transitionEnterTimeout={660}
        transitionLeaveTimeout={660}
        transitionAppearTimeout={660}
        transitionAppear={true}>
          {this.props.showControls &&
          <div className="fve-play-button">
            {this.props.playback.paused ?
              <PlayBtn play={this.props.play}/> :
              <PauseBtn pause={this.props.pause}/>}
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }
}
