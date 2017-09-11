import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ScrollLock from 'react-scrolllock'
import {binder} from '../../utils'
import CategoriesList from './CategoriesList'
import ThumbnailsContainer from './ThumbnailsContainer'
import ScrollButtons from './ThumbnailScrollButtons'

class CategoriesPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      showButtons:false,
      numThumbs:0,
      range:[1,6],
      top:true,
      bottom:false
    }
    binder(this,['scrollUp','scrollDown','showButtons','getNumThumbs','resetRange'])
  }
  componentWillMount(){this.getNumThumbs()}
  componentDidMount(){this.getNumThumbs()}
  resetRange(){this.setState({range:[1,6], top:true, bottom:false})}
  showButtons(bool){this.setState({showButtons:bool})}
  getNumThumbs(){
    const {videos} = this.props.category
    const validVids = videos.filter(vid=>vid.video.vimeoid)
    this.setState({numThumbs:validVids.length})
    this.showButtons(validVids.length>6)
  }
  scrollUp(){
    const {range} = this.state
    const newRange = this.state.top ? range : range.map(n=>n-6)
    const topped = newRange[0]===1
    const bottomed = this.state.numThumbs<=newRange[1]
    this.setState({range:newRange, bottom:bottomed, top:topped})
  }
  scrollDown(){
    const {range} = this.state
    const newRange = this.state.bottom ? range : range.map(n=>n+6)
    const topped = newRange[0]===1
    const bottomed = this.state.numThumbs<=newRange[1]
    this.setState({range:newRange, top:topped, bottom:bottomed})
  }

  render(){
    return (
      <div
      className="archive">
      <ScrollLock/>
        <div className="categories">
          <h3>Topics</h3>
          <CategoriesList {...this.props}
            thumbList={true}
            resetRange={this.resetRange}/>
        </div>
        <ReactCSSTransitionGroup
          component="FirstChild"
          transitionName="btn-fade"
          transitionEnterTimeout={660}
          transitionLeaveTimeout={660}
          transitionAppear={true}
          transitionAppearTimeout={660}>
          {this.state.showButtons &&
          <ScrollButtons
            range={this.state.range}
            numThumbs={this.state.numThumbs}
            bottom={this.state.bottom}
            top={this.state.top}
            scrollUp={this.scrollUp}
            scrollDown={this.scrollDown}/>}
        </ReactCSSTransitionGroup>
        <ThumbnailsContainer
          path={this.props.path}
          category={this.props.category}
          range={this.state.range}
          showHeader={this.props.showHeader}
          showButtons={this.showButtons}
          numThumbs={this.state.numThumbs}
          getNumThumbs={this.getNumThumbs}
          resetRange={this.resetRange}/>
        <div className='thumbnails-scrim'/>
    </div>)
  }
}
export default withRouter(CategoriesPage)
