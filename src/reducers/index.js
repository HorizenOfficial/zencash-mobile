import { combineReducers } from 'redux';

import SecretsReducer from './Secrets'


const allReducers = combineReducers({  
    secrets: SecretsReducer  
});

export default allReducers;