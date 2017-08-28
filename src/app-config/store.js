import { compose, createStore, applyMiddleware } from 'redux'  
// import {createLogger} from 'redux-logger'
import {autoRehydrate} from 'redux-persist'
import promise from 'redux-promise'
import reducers from '../reducers'
import {PLAYBACK_INIT} from '../actions'

// const logger = createLogger({
//   predicate:(getState,action)=>action.type!==PLAYBACK_INIT
// })

// const Store = compose(
//   applyMiddleware(promise, logger),
//   autoRehydrate()
// )(createStore)(reducers)

const Store = compose(
  applyMiddleware(promise),
  autoRehydrate()
)(createStore)(reducers)

export default Store
