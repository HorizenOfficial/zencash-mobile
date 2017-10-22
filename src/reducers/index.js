import { combineReducers } from 'redux'

import SecretsReducer from './Secrets'
import SettingsReducer from './Settings'
import ContextReducer from './Context'
import ContactsReducer from './Contacts'

const allReducers = combineReducers({
  secrets: SecretsReducer,
  settings: SettingsReducer,
  context: ContextReducer,
  contacts: ContactsReducer
})

export default allReducers
