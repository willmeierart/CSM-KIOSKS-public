import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {selectVideo} from '../actions'
import {formatTime} from '../utils'

class Thumbnail extends Component {
  constructor(props) {
    super(props)
    this.state={currentCat:{}}
    this.selectVideo = this.selectVideo.bind(this)
  }

  selectVideo(){
    this.props.onSelectVideo(this.props.video)
  }
  render() {
    const {video} = this.props
    return (
      <div>
        {video &&
        <Link className='item link' onClick={this.selectVideo} to='/videos'>
          <div className='ratio'></div>
          <div className='inner'>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="thumbnail"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionEnter={true}
                transitionLeave={true}
                transitionAppear={true}
                transitionAppearTimeout={1000}>
              <div className='image' key={video.id}
                style={{backgroundImage:`url(${video.thumbnail_large})`}}>
              </div>
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="thumbnail-text"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionEnter={false}
                transitionLeave={true}
                transitionAppear={true}
                transitionAppearTimeout={1000}>
              <h3>{video.title}</h3>
              <p>
                <span className='description'>{this.props.description} </span>
                <span className='time'>{formatTime(video.duration) !== '0' ? formatTime(video.duration) : ''}</span>
              </p>
            </ReactCSSTransitionGroup>
          </div>
        </Link>}
      </div>
    )
  }
}

const mapStateToProps=(state)=>{return {data:state}}
const mapDispatchToProps=dispatch=>{return{
  onSelectVideo:vid=>{dispatch(selectVideo(vid))}
}}

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
