import {
  SET_SECRETS
} from '../actions/Secrets'

/*
 * Secret objects are of type
 * [
 *    {
 *       address: 'address',
 *       privateKey: 'private key'
 *    }
 * ]
 */
// Should be reading from file
// Example below is just test data, steal away, if you're reading this :)
const initialSecrets = [
  {
    address: 'znVZqVEZbM8ryMsf4zhS4KtQ2pYdtEU8AtN',
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

export default function SecretsReducer(state=initialSecrets, action){
  switch(action.type){
    case SET_SECRETS:
      return Object.assign({}, {
        secrets: action.secrets
      })

    default:
      return state
  }
}