import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from 'redux'

import App from './containers'
import reducers from './reducers'

const middleware = [ thunk ]
const store = createStore(reducers,applyMiddleware(...middleware)) 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)