import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { AppContainer } from 'react-hot-loader'

import allReducers from './reducers'
import App from './containers/App'

import ons from 'onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import '../assets/css/index.css'

import { ZENCASH_MOBILE_SAVE_PATH, ZENCASH_MOBILE_CONTACTS_PATH, writeToFile } from './utils/persistentStorage'

const logger = createLogger()

const store = createStore(allReducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger)
)

// Save file, etc
store.subscribe(() => {
  const state = store.getState()

  // Save secret phrase and settings
  if (state.secrets.secretPhrase !== null && state.settings.pin !== null) {
    // Write to file woot woot    
    writeToFile(ZENCASH_MOBILE_SAVE_PATH, {
      secretPhrase: state.secrets.secretPhrase,
      settings: state.settings
    })
  }

  // Save contacts (different file)
  if (state.contacts.length > 0) {
    // Write to file woot woot
    writeToFile(ZENCASH_MOBILE_CONTACTS_PATH, {
      contacts: state.contacts
    })
  }
})

const rootElement = document.getElementById('root')

ons.ready(() => render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
))

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootElement
    )
  })
}
