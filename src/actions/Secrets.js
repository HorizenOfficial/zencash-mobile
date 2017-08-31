export const SET_SECRETS = 'SET_SECRETS'


export function setSecrets (secrets) {
  return {
    type: SET_SECRETS,
    secrets
  }
}