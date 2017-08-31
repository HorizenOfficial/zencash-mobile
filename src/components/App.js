import React from 'react';

import {
  Navigator
} from 'react-onsenui';

import MainPage from '../containers//MainPage';
import SetupPage from './SetupPage'

const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
);

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
  />
);

export default App;
