import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class AdminChannelList extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(i){
    this.props.onSelectKioskSet(this.props.data[i])
  }

  render(){
    const sortedCategories = this.props.adminSetList.sort((a,b)=>{
      const sorta=x=>x.title[0].charCodeAt()
      return sorta(a) - sorta(b)
    })
    const linkList = sortedCategories.map((each)=>{
      return(
        <li key={each.index} className="opaque" >
          <NavLink
              onClick={()=>{this.handleClick(each.index)}} to={'/'}
              className="link">
            <span>{each.title}</span>
          </NavLink>
        </li>
      )
    })
    return (
      <ul>
        {linkList}
      </ul>
    )
  }
}
