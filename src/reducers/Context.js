import {
  SET_ADDRESS,
  SET_PRIVATE_KEY,
  SET_ADDRESS_VALUE,
  SET_READ_SAVED_FILE
} from '../actions/Context'

const initialContext = {
  address: null,
  privateKey: null,
  value: null,
  readSavedFile: false // We haven't read the file by default (curse you async JS)
}

export default function ContextReducer(state=initialContext, action){
  switch(action.type){
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

    case SET_READ_SAVED_FILE:
      return Object.assign({}, state, {
        readSavedFile: action.readSavedFile
      })
    
    default:
      return state
  }
}