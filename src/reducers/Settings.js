// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill 
import 'babel-polyfill'

import {
  LANG_ENGLISH,
  CURRENCY_USD,    
  SET_LANGUAGE,
  SET_CURRENCY
} from '../actions/Settings'

const initialSettings = {
  insightAPI: 'https://explorer.zensystem.io/insight-api-zen/',
  explorerURL: 'http://explorer.zenmine.pro/insight/',
  language: LANG_ENGLISH,
  currency: CURRENCY_USD
}

export default function SettingsReducer(state=initialSettings, action){
  switch(action.type) {
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