import React, {Component} from 'react'
import {AnimationSequence, Animatable} from 'react-web-animation'
import ListModule from '../Interface/CategoriesListModule'

export default class FrontPageList extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentTime:0,
      playState: 'running'
    }
    this.renderLines=this.renderLines.bind(this)
    this.willLeave=this.willLeave.bind(this)
  }
  renderLines(list){
    const num = list.length
    return list.map((cat,i)=>{
      const amt = (i+1)/num*100
      return(<div key={i} className="category-breaker"
      style={{bottom:`${amt}%`}}></div>)
    }).slice(0,list.length-1)
  }
  willLeave(){
    return {y:-20}
  }
  getKeyFrames(){
    return[
      {transform: 'scale(1)', opacity:'.5', offset:0},
      {transform: 'scale(1)', opacity:'1.0', offset:0.175},
      {transform: 'scale(1)', opacity:'1.0', offset:0.825},
      {transform: 'scale(1)', opacity:'0.5', offset:1}
    ]
  }
  getTiming(duration){
    return{
      duration,
      easing: 'ease-in-out',
      delay:-1000,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    }
  }
  handleClick(i){this.props.onSelectCategory(this.props.set.categories[i])}

  renderCondition(id, category, url){
    return (
      <Animatable.div key={id}
        id={this.props.id}
        className="list"
        keyframes={this.getKeyFrames()}
        timing={this.getTiming(4375)}
        onClick={this.props.handleClick}>
          <div key={id}>
            <ListModule id={id} key={id}
              className="module"
              title={category}
              handleClick={()=>{this.handleClick(id)}}/>
          </div>
      </Animatable.div>
    )
  }

  render(){
    const linkList = this.props.set.categories.filter(each=>{
      return each.category.visibility!=='hidden'})
      .map((each, id)=>{const url_snippet = each.category.title.toLowerCase().split(' ').join('-')
      return this.renderCondition(id, each.category.title, url_snippet)
    })
    return (
      <div style={{width:'100%', height:'100%', position:'relative'}}>
        {this.renderLines(linkList)}
         <AnimationSequence key={'1'} component="ul" className="front-ul"
            playState={this.state.playState} currentTime={this.state.currentTime}
            onFinish={()=>{this.setState({playState:'running'})}}>
              {linkList}
          </AnimationSequence>
      </div>
    )
  }
}
