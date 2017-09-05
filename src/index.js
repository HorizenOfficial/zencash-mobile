import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import allReducers from './reducers';
import App from './containers/App';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css'

import { ZENCASH_MOBILE_SAVE_PATH, readFromFile, writeToFile } from './utils/persistentStorage'

const logger = createLogger();

const store = createStore(allReducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger)
);

// Save file, etc
store.subscribe(() => {
  const state = store.getState()  

  if (state.secrets.secretPhrase !== null){
    // Write to file woot woot    
    writeToFile(ZENCASH_MOBILE_SAVE_PATH, {
      secretPhrase: state.secrets.secretPhrase,
      settings: state.settings
    })
  }
})

const rootElement = document.getElementById('root');

ons.ready(() => render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
));

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
