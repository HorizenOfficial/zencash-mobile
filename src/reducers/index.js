import { combineReducers } from 'redux'

import SecretsReducer from './Secrets'
import SettingsReducer from './Settings'
import ContextReducer from './Context'

const allReducers = combineReducers({
  secrets: SecretsReducer,
  settings: SettingsReducer,
  context: ContextReducer
})

export default allReducers
