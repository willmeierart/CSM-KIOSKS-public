import React, {Component} from 'react'
import AdminChannelList from './AdminChannelList'

export default class AdminMenu extends Component{
  componentWillMount(){this.props.showHeader()}
  render(){
    return (
      <div className="frontpage admin-frontpage">
        <AdminChannelList data={this.props.data}
          showHeader={this.props.showHeader}
          adminSetList={this.props.adminSetList}
          onSelectKioskSet={this.props.onSelectKioskSet}/>
      </div>
    )
  }
}
