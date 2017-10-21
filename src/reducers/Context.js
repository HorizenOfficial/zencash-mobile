// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import 'babel-polyfill'

import {
  SET_ADDRESS,
  SET_PRIVATE_KEY,
  SET_ADDRESS_VALUE,
  SET_QR_SCANNING,
  SET_ZEN_IN_BTC_VALUE,
  SET_ZEN_IN_CURRENCY_VALUE,
  SET_HAS_INPUT_PIN
} from '../actions/Context'

const initialContext = {
  address: null,
  privateKey: null, // WIF format
  value: null,
  BTCValue: null,
  currencyValue: null,
  qrScanning: false, // we currently using QR Scanner? To preview it we need to make web view transparent
  readSavedFile: false, // We haven't read the file by default (curse you async JS)
  hasInputPin: false // By default the user hasn't inputted his pin
}

export default function ContextReducer (state = initialContext, action) {
  switch (action.type) {
    case SET_HAS_INPUT_PIN:
      return Object.assign({}, state, {
        hasInputPin: action.hasInputPin
      })

    case SET_ZEN_IN_BTC_VALUE:
      return Object.assign({}, state, {
        BTCValue: action.BTCValue
      })

    case SET_ZEN_IN_CURRENCY_VALUE:
      return Object.assign({}, state, {
        currencyValue: action.currencyValue
      })

    case SET_QR_SCANNING:
      return Object.assign({}, state, {
        qrScanning: action.qrScanning
      })

    case SET_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      })

    case SET_PRIVATE_KEY:
      return Object.assign({}, state, {
        privateKey: action.privateKey
      })

    case SET_ADDRESS_VALUE:
      return Object.assign({}, state, {
        value: action.value
      })

    default:
      return state
  }
}
