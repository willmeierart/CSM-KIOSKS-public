import React, {Component} from 'react'
import Thumbnail from '../../containers/Thumbnail'

export default class ThumbnailsContainer extends Component {
  constructor(props){
    super(props)
    this.updateButtons=this.updateButtons.bind(this)
    this.renderThumbs=this.renderThumbs.bind(this)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.category!==this.props.category){
      this.updateButtons()
    }
  }
  updateButtons(){
    const {videos} = this.props.category
    const validVids = videos.filter(vid=>vid.video.vimeoid)
    const L = validVids.length
    this.props.showButtons(L>6)
    this.props.getNumThumbs()
  }
  renderThumbs(){
    const {videos} = this.props.category
    const {range} = this.props
    const validVids = videos.filter(vid=>vid.video.vimeoid)
    return validVids.slice(range[0]-1, validVids.length)
      .map((vid, i)=>{return (
        <Thumbnail key={range[0]+vid.video.vimeoid}
          id={Date.now()}
          category={this.props.category}
          video={vid.videoData[0]}
          description={vid.video.description}
          showButtons={this.showButtons}/>)})
  }
  render() {
    {/*const {videos} = this.props.category
    const {range} = this.props
    const validVids = videos.filter(vid=>vid.video.vimeoid)
    const thumbnails = validVids.slice(range[0]-1, validVids.length)
      .map((vid, i)=>{return (
        <Thumbnail key={range[0]+vid.video.vimeoid}
          id={Date.now()}
          category={this.props.category}
          video={vid.videoData[0]}
          description={vid.video.description}
          showButtons={this.showButtons}/>)})*/}
    return (<div className='thumbnails'>{this.renderThumbs()}</div>)
  }
}
