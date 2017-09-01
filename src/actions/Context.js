export const SET_ADDRESS = 'SET_CURRENT_ADDRESS'
export const SET_PRIVATE_KEY = 'SET_CURRENT_PRIVATE_KEY'
export const SET_ADDRESS_VALUE = 'SET_CURRENT_ADDRESS_VALUE'


export function setAddress (address) {
  return {
    type: SET_ADDRESS,
    address
  }
}

export function setPrivateKey (privateKey) {
  return {
    type: SET_PRIVATE_KEY,
    privateKey
  }
}

export function setAddressValue (value) {
  return {
    type: SET_ADDRESS_VALUE,
    value
  }
}