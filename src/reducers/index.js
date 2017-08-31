import { combineReducers } from 'redux';

import SecretsReducer from './Secrets'
import SettingsReducer from './Settings'


const allReducers = combineReducers({  
    secrets: SecretsReducer,
    settings: SettingsReducer
});

export default allReducers;