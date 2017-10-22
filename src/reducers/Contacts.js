// @flow
// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import 'babel-polyfill'

import type { CONTACT } from '../types'

import {
  SET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT
} from '../actions/Contacts'

const initialContacts: (?CONTACT)[] = []

export default function ContactsReducer (state: (?CONTACT)[] = initialContacts, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return state.concat(action.contact)

    case DELETE_CONTACT:
      return state.filter((c) => !(c.name === action.contact.name && c.address === action.contact.address))

    case SET_CONTACTS:
      return action.contacts

    default:
      return state
  }
}
