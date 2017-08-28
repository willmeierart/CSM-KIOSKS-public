import React, {Component} from 'react'
import {DownActive, DownInactive, UpActive, UpInactive} from '../Structure/icons'

export default class ScrollButtons extends Component {
  render() {
    const {scrollUp,scrollDown} = this.props
    return (
      <div onClick={this.update} className="scroll-buttons">
        {this.props.bottom ?
          <DownInactive scrollDown={scrollDown}/> :
          <DownActive scrollDown={scrollDown}/>}
        {this.props.top ?
          <UpInactive scrollUp={scrollUp}/> :
          <UpActive scrollUp={scrollUp}/>}
      </div>
    )
  }
}
