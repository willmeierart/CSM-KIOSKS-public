import React, {Component} from 'react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import localForage from 'localforage'
import Loader from 'react-loader'

import Store from './store'
import App from '../containers/App'

export default class AppProvider extends Component{
  constructor(){
    super()
    this.state = {rehydrated:false}
  }

  componentWillMount(){
    persistStore(Store, {storage:localForage}, ()=>{
      this.setState({rehydrated:true})
  })}

  render(){
    if(!this.state.rehydrated){
      return (<Loader color="#fff" />)
    }
    return(
      <Provider store={Store}>
        <App />
      </Provider>
    )
  }
}
