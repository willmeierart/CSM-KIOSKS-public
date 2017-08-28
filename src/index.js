// import React from 'react'
// import ReactDOM from 'react-dom'
// import store from './store'
// import App from './containers/App'
// import registerServiceWorker from './registerServiceWorker'
// import { Provider } from 'react-redux'
//
//
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// ,document.getElementById('root'))
// registerServiceWorker()


import React from 'react'
import ReactDOM from 'react-dom'
// import registerServiceWorker from './registerServiceWorker'
import AppProvider from './app-config/AppProvider'

ReactDOM.render(
  <AppProvider />
,document.getElementById('root'))
// registerServiceWorker()
