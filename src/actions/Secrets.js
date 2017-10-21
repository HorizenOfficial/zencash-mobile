export const SET_SECRET_ITEMS = 'SET_SECRET_ITEMS'
export const SET_SECRET_PHRASE = 'SET_SECRET_PHRASE'

export function setSecretItems (items) {
  return {
    type: SET_SECRET_ITEMS,
    items
  }
}

export function setSecretPhrase (secretPhrase) {
  return {
    type: SET_SECRET_PHRASE,
    secretPhrase
  }
}
