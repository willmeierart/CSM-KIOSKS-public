import { compose, createStore, applyMiddleware } from 'redux'
// import {createLogger} from 'redux-logger'
import {autoRehydrate} from 'redux-persist'
import promise from 'redux-promise'
import * as asyncInitialState from 'redux-async-initial-state'
import reducers from '../reducers'
// import {PLAYBACK_INIT} from '../actions'

const loadStore=()=>{
  return new Promise(resolve=>{
    fetch('/kiosk')
    // .then(response=>{response.json()})
    .then(resolve)
  })
}

// DEVELOPMENT:
// const logger = createLogger({
//   predicate:(getState,action)=>action.type!==PLAYBACK_INIT
// })
// const Store = compose(
//   applyMiddleware(promise, logger, asyncInitialState.middleware(loadStore)),
//   autoRehydrate()
// )(createStore)(reducers)

const Store = compose(
  applyMiddleware(promise, asyncInitialState.middleware(loadStore)),
  autoRehydrate()
)(createStore)(reducers)

export default Store
