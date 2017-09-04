import {
  LANG_ENGLISH,
  LANG_RUSSIAN,
  SET_LANGUAGE
} from '../actions/Settings'

const initialSettings = {
  insightAPI: 'https://explorer.zensystem.io/insight-api-zen/',
  explorerURL: 'http://explorer.zenmine.pro/insight/',
  language: LANG_ENGLISH
}

export default function SettingsReducer(state=initialSettings, action){
  switch(action.type) {
    case SET_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language
      })
    
    default:
      return state
  }
}