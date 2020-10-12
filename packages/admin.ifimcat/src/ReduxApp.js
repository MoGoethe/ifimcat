import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import reducers from './reducers'
import { icons } from './assets/icons'

React.icons = icons
const store = createStore(reducers)
const ReduxApp = () => (
  <Provider store={store}><App/></Provider>
)

export default ReduxApp