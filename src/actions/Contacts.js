// @flow
import type { CONTACT } from '../types'

export const SET_CONTACTS = 'SET_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'

export function setContacts (contacts: (?CONTACT)[]) {
  return {
    type: SET_CONTACTS,
    contacts
  }
}

export function addContact (contact: CONTACT) {
  return {
    type: ADD_CONTACT,
    contact
  }
}

export function deleteContact (contact: CONTACT) {
  return {
    type: DELETE_CONTACT,
    contact
  }
}
