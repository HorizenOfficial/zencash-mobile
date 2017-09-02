import React from 'react';

import {
  Navigator
} from 'react-onsenui';

import PreMainPage from '../containers/PreMainPage'

const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
);

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{component: PreMainPage, key: 'PRE_MAIN_PAGE'}}
  />
);

export default App;
