import React, {Component} from 'react'
import FrontPageList from '../Structure/FrontPageList'
import ScrollLock from 'react-scrolllock'

export default class FrontPage extends Component{
  constructor(props){
    super(props)
    this.state={w:'0',h:'0'}
    this.getWindow=this.getWindow.bind(this)
  }
  componentWillMount(){
    this.props.showHeader()
    this.getWindow()
    window.addEventListener('resize',this.getWindow)
  }
  componentWillUnmount(){window.removeEventListener('resize',this.getWindow)}
  getWindow(){this.setState({w:window.innerWidth,h:window.innerHeight})}
  render(){
    const {w,h}=this.state
    const ratioW = 1920/1080*100
    const ratioH = 1080/1920*100
    let fillScreen = {}
    w/h < 1920/1080
      ? fillScreen=['height','100vh','width',`${ratioW}vh`,'left',`${(w-(ratioW*h/100))/2}`]
      : fillScreen=['width','100vw','height',`${ratioH}vw`,'top',`${(h-(ratioH*w/100))/2}`]
    // const {backgroundvideo} = this.props.set
    // const url = backgroundvideo.split('/')
    // const bgID = url[url.length-1]
    const bgVidStyles={
      position:'absolute',
      top:'0 !important',
      zIndex:'3',
      [fillScreen[0]]:fillScreen[1],
      [fillScreen[2]]:fillScreen[3],
      [fillScreen[4]]:parseInt(fillScreen[5],10),
    }
    return (
      <div className="frontpage">
        <div className="fullsize-container" style={{position:'relative'}}>

            <iframe className="backgroundvideo"
              title="BackgroundVideo"
              src={`https://player.vimeo.com/video/230292141?api=1&background=1`}
        // src={`https://player.vimeo.com/video/${bgID}?api=1&background=1`}
              style={bgVidStyles} frameBorder="0"/>
          <div style={{width:'100%',height:'100%',position:'absolute',top:0}}>
            <FrontPageList {...this.props}/>
          </div>
        </div>
        <ScrollLock/>
      </div>
    )
  }
}



// import React, {Component} from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import CategoriesList from '../Interface/CategoriesList'
// import ScrollLock from 'react-scrolllock'
//
// export default class FrontPage extends Component{
//   constructor(props){
//     super(props)
//     this.state={w:'0',h:'0'}
//     this.getWindow=this.getWindow.bind(this)
//   }
//   componentWillMount(){
//     this.props.showHeader()
//     this.getWindow()
//     window.addEventListener('resize',this.getWindow)
//   }
//   componentWillUnmount(){window.removeEventListener('resize',this.getWindow)}
//   getWindow(){this.setState({w:window.innerWidth,h:window.innerHeight})}
//   render(){
//     const {w,h}=this.state
//     const ratioW = 1920/1080*100
//     const ratioH = 1080/1920*100
//     let fillScreen = {}
//     w/h < 1920/1080
//       ? fillScreen=['height','100vh','width',`${ratioW}vh`,'left',`${(w-(ratioW*h/100))/2}`]
//       : fillScreen=['width','100vw','height',`${ratioH}vw`,'top',`${(h-(ratioH*w/100))/2}`]
//     // const {backgroundvideo} = this.props.set
//     // const url = backgroundvideo.split('/')
//     const bgVidStyles={
//       position:'absolute',
//       zIndex:'3',
//       [fillScreen[0]]:fillScreen[1],
//       [fillScreen[2]]:fillScreen[3],
//       [fillScreen[4]]:parseInt(fillScreen[5],10),
//     }
//     return (
//       <div className="frontpage">
//         <div className="fullsize-container" style={{position:'relative'}}>
//           <ReactCSSTransitionGroup
//               component="div"
//               className="bg-vid-wrapper"
//               transitionName="bg-fade"
//               transitionEnterTimeout={660}
//               transitionLeaveTimeout={660}
//               transitionAppearTimeout={660}
//               transitionAppear={true}>
//             <iframe className="backgroundvideo"
//               title="BackgroundVideo"
//               src={`https://player.vimeo.com/video/230292141?api=1&background=1`}
//   // src={`https://player.vimeo.com/video/${bgID}?api=1&background=1`}
//               style={bgVidStyles} frameBorder="0"/>
//           </ReactCSSTransitionGroup>
//           <div style={{width:'100%',height:'100%',position:'absolute',top:0}}>
//             <CategoriesList frontpageList={true} {...this.props}/>
//           </div>
//         </div>
//         <ScrollLock/>
//       </div>
//     )
//   }
//
// }
