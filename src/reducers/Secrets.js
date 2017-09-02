import {
  SET_SECRET_ITEMS,
  SET_SECRET_PHRASE
} from '../actions/Secrets'

/*
 * Secret item objects are of type
 * [
 *    {
 *       address: 'address',
 *       privateKey: 'private key'
 *    }
 * ]
 */

// const initialSecrets = {
//   secretPhrase: null,  
//   items: []
// }

// Should be reading from file
// Example below is just test data, steal away, if you're reading this :)
const initialSecrets = {
  secretPhrase: 'one two three four five six seven eight nine ten',
  items: [
    {
      address: 'znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf',//znVZqVEZbM8ryMsf4zhS4KtQ2pYdtEU8AtN',
      privateKey: 'L25wxXcLDKn7BVzGRqZ8LCxwxBsQLcZYoWv3ZP1WSxv1LZjE9prF'
    },
    {
      address: 'znh75EHQ2sEPayLCRFLq5F515JpTq6es15p',
      privateKey: 'L1HhHpy3SLDvabp5BQPNPEvkCACy2w5UD8vSRDe8eA3rpaC2z9zd'    
    },
    {
      address: 'znfSPG515SjtrXT7WddiYeDx9dnFhqEFhoq',
      privateKey: 'L4W4dhCMoVxZ4fh1iz8PKsYun9rVubJpFVRnHTGC3BpKxGVp4Cuw' 
    }
  ]
}

export default function SecretsReducer(state=initialSecrets, action){
  switch(action.type){
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