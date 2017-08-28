import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Motion, spring} from 'react-motion'

export default class ListModule extends Component {
  render() {
    const selectedClass = this.props.category && this.props.title === this.props.category.title ? 'selected' : ''
    return (
      <div onClick={this.props.handleClick}
        key={this.props.id}>
        <Motion
          defaultStyle={{opacity:.5}}
          style={{opacity:spring(1, {stiffness:50})}}>
          {(style)=>
          <NavLink to='/categories'
            className="link">
            <span className={selectedClass} style={style}>
              {this.props.title}
            </span>
          </NavLink>}
        </Motion>
      </div>
    )
  }
}
