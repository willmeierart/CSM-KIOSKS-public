import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Header from './Header'
import Index from './NavIndex'

export default class NavWrapper extends Component {
  render() {
    return (
      <div className='nav-wrapper'>
        <ReactCSSTransitionGroup
            component= "div"
            transitionName="header"
            transitionEnterTimeout={660}
            transitionLeaveTimeout={660}>
          {this.props.showHeader &&
          <Header hideNav={this.props.hideNav}
            showHeader={this.props.showHeader}
            onShowHeader={this.props.onShowHeader}
            toggleNav={this.props.toggleNav}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
            component= "div"
            transitionName="index"
            transitionAppear={true}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppearTimeout={1000}>
          {this.props.showIndex &&
          <Index set={this.props.set}
            onShowHeader={this.props.onShowHeader}
            // {/*history={this.props.history}*/}
            hideNav={this.props.hideNav}
            onSelectVideo={this.props.onSelectVideo}
            onSelectCategory={this.props.onSelectCategory}/>}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
