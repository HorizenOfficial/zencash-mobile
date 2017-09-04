export const LANG_ENGLISH = 'English'
export const LANG_RUSSIAN = 'Russian'

export const LANGUAGES = [
  LANG_ENGLISH,
  LANG_RUSSIAN
]

export const SET_LANGUAGE = 'SET_LANGUAGE'

export function setLanguage(language){
  return {
    type: SET_LANGUAGE,
    language
  }
}