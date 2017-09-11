import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {formatTime, URLformat} from '../../utils'
import {Down} from './icons'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'list',
      sortBy: 'title'
    }
    this.renderDataRows = this.renderDataRows.bind(this)
    this.goToVideo = this.goToVideo.bind(this)
    this.handleClickSort = this.handleClickSort.bind(this)
  }
  componentDidMount(){this.props.onShowHeader()}
  handleClickSort(value){
    this.setState({
      sortBy:value
    })
  }
  goToVideo(vid){
    const URL = URLformat(vid.data[0].title)
    this.props.hideNav()
    this.props.onSelectCategory(vid.category)
    this.props.onSelectVideo(vid.data[0])
    this.props.history.push(`/videos/${URL}`)
    console.log(URL);
  }
  renderDataRows(){
    const bigVidList = []
    this.props.set.categories.forEach((category)=>{
      category.category.videos.forEach((video)=>{
        const vimSplit = video.video.vimeoid.split('/')
        const ID = vimSplit[vimSplit.length-1]
        const vidObj={
          id:ID,
          title: video.videoData ? video.videoData[0].title : video.video.title,
          topic:category.category.title,
          category:category,
          time:video.videoData ? formatTime(video.videoData[0].duration) : '',
          url:`/videos/${URLformat(video.video.title)}`,
          complete: video.videoData ? true : false,
          data: video.videoData
        }
        return bigVidList.push(vidObj)
      })
    })
    return bigVidList
  }

  render() {
    const {sortBy} = this.state
    const sorta=(list)=>{
      list = list.sort((a,b)=>{
        return a[sortBy][0].charCodeAt()-b[sortBy][0].charCodeAt()
      }).filter(vid=>vid.complete).map((vid, i)=>{
        return(
          <tr onClick={()=>{this.goToVideo(vid)}} key={i}>
            <td>{vid.title}</td>
            <td>{vid.topic}</td>
            <td>{vid.time}</td>
          </tr>
        )
      })
      return list
    }
    return (

      <div className="index-main" style={{position:'absolute',height:'100%',width:'100vw',background:'black'}}>
        <div key="1" className="index-container">
          <table>
            <thead>
              <tr>
                <td className="click-sort"
                  onClick={()=>{this.handleClickSort('title')}}>
                  TITLE {this.state.sortBy==='title' &&
                  <Down/>}</td>
                <td className="click-sort"
                  onClick={()=>{this.handleClickSort('topic')}}>
                  TOPIC {this.state.sortBy==='topic' &&
                  <Down/>} </td>
                <td><small>TIME</small></td>
              </tr>
            </thead>
            <tbody>
              {sorta(this.renderDataRows())}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withRouter(Index)
