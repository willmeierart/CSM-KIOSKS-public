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


//
//
//
//
// import React, {Component} from 'react'
// import { connect } from 'react-redux'
// import {Link} from 'react-router-dom'
// import {TransitionMotion, Motion, spring} from 'react-motion'
// import {selectVideo} from '../actions'
// import {formatTime, URLformat, binder} from '../utils'
//
// class Thumbnail extends Component {
//   constructor(props) {
//     super(props)
//     this.state={currentCat:{},refreshing:true}
//     binder(this,['selectVideo', 'willLeave', 'willEnter'])
//   }
//   // componentWillReceiveProps(nextProps){
//   //   nextProps.category!==this.state.currentCat ?
//   //     this.setState({refreshing:true,currentCat:nextProps.category}) :
//   //     this.setState({refreshing:false})
//   // }
//   selectVideo(){ this.props.onSelectVideo(this.props.video) }
//
//   willEnter(){
//     console.log('enter');
//     return {opacity:0,y:50}
//   }
//   willLeave(){
//     console.log('leave');
//     return {opacity:spring(0),y:spring(-50)}
//   }
//
//   render() {
//     const {video} = this.props
//     return (
//       <div>
//         {video &&
//         <Link className='item link' onClick={this.selectVideo} to='/videos'>
//           <div className='ratio'></div>
//           <div className='inner'>
//             <TransitionMotion
//               styles={[{
//                 key:`${video.id}s`,
//                 data:{},
//                 style:{opacity:spring(1),y:spring(0)}
//               }]}
//               willEnter={this.willEnter}
//               willLeave={this.willLeave}>
//               {(items)=>{
//                 return (<div>{items.map(item=>{
//                   console.log(item.style);
//                   return(<div className='image' key={item.key}
//                     style= {{opacity:item.style.opacity, transform:`translateY:${item.style.y}`, backgroundImage:`url(${video.thumbnail_large})`}}>
//                   </div>
//                 )})}</div>)
//               }}
//             </TransitionMotion>
//
//
//               <h3>{video.title}</h3>
//               <p>
//                 <span className='description'>{this.props.description} </span>
//                 <span className='time'>{formatTime(video.duration) !== '0' ? formatTime(video.duration) : ''}</span>
//               </p>
//
//           </div>
//         </Link>}
//       </div>
//     )
//   }
// }
//
// const mapStateToProps=(state)=>{return {data:state}}
// const mapDispatchToProps=dispatch=>{return{
//   onSelectVideo:vid=>{dispatch(selectVideo(vid))}
// }}
//
// export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
