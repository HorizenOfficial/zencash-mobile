// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill 
import 'babel-polyfill'

import {
  SET_SECRET_ITEMS,
  SET_SECRET_PHRASE
} from '../actions/Secrets'

/*
 * item objects are of type
 * [
 *    {
 *       address: 'address',
 *       privateKey: 'private key'
 *    }
 * ]
 */

const initialSecrets = {
  secretPhrase: null,
  items: []
}

export default function SecretsReducer (state = initialSecrets, action) {
  switch (action.type) {
    case SET_SECRET_ITEMS:
      return Object.assign({}, state, {
        items: action.items
      })

    case SET_SECRET_PHRASE:
      return Object.assign({}, state, {
        secretPhrase: action.secretPhrase
      })

    default:
      return state
  }
}
