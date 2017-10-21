// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill 
import 'babel-polyfill'

import {
  LANG_ENGLISH,
  CURRENCY_USD,
  SET_LANGUAGE,
  SET_CURRENCY,
  SET_WALLET_PIN
} from '../actions/Settings'

const initialSettings = {
  insightAPI: 'https://explorer.zensystem.io/insight-api-zen/',
  explorerURL: 'http://explorer.zensystem.io/',
  language: LANG_ENGLISH,
  currency: CURRENCY_USD,
  pin: null
}

export default function SettingsReducer (state = initialSettings, action) {
  switch (action.type) {
    case SET_WALLET_PIN:
      return Object.assign({}, state, {
        pin: action.pin
      })

    case SET_CURRENCY:
      return Object.assign({}, state, {
        currency: action.currency
      })

    case SET_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language
      })

    default:
      return state
  }
}
