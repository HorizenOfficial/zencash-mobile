// Currencies
export const CURRENCY_AUD = 'AUD'
export const CURRENCY_BRL = 'BRL'
export const CURRENCY_CAD = 'CAD'
export const CURRENCY_CHF = 'CHF'
export const CURRENCY_CLP = 'CLP'
export const CURRENCY_CNY = 'CNY'
export const CURRENCY_CZK = 'CZK'
export const CURRENCY_DKK = 'DKK'
export const CURRENCY_EUR = 'EUR'
export const CURRENCY_GBP = 'GBP'
export const CURRENCY_HKD = 'HKD'
export const CURRENCY_HUF = 'HUF'
export const CURRENCY_IDR = 'IDR'
export const CURRENCY_ILS = 'ILS'
export const CURRENCY_INR = 'INR'
export const CURRENCY_JPY = 'JPY'
export const CURRENCY_KRW = 'KRW'
export const CURRENCY_MXN = 'MXN'
export const CURRENCY_MYR = 'MYR'
export const CURRENCY_NOK = 'NOK'
export const CURRENCY_NZD = 'NZD'
export const CURRENCY_PHP = 'PHP'
export const CURRENCY_PKR = 'PKR'
export const CURRENCY_PLN = 'PLN'
export const CURRENCY_RUB = 'RUB'
export const CURRENCY_SEK = 'SEK'
export const CURRENCY_SGD = 'SGD'
export const CURRENCY_THB = 'THB'
export const CURRENCY_TRY = 'TRY'
export const CURRENCY_TWD = 'TWD'
export const CURRENCY_USD = 'USD'
export const CURRENCY_ZAR = 'ZAR'

export const CURRENCIES = [
  CURRENCY_AUD,
  CURRENCY_BRL,
  CURRENCY_CAD,
  CURRENCY_CHF,
  CURRENCY_CLP,
  CURRENCY_CNY,
  CURRENCY_CZK,
  CURRENCY_DKK,
  CURRENCY_EUR,
  CURRENCY_GBP,
  CURRENCY_HKD,
  CURRENCY_HUF,
  CURRENCY_IDR,
  CURRENCY_ILS,
  CURRENCY_INR,
  CURRENCY_JPY,
  CURRENCY_KRW,
  CURRENCY_MXN,
  CURRENCY_MYR,
  CURRENCY_NOK,
  CURRENCY_NZD,
  CURRENCY_PHP,
  CURRENCY_PKR,
  CURRENCY_PLN,
  CURRENCY_RUB,
  CURRENCY_SEK,
  CURRENCY_SGD,
  CURRENCY_THB,
  CURRENCY_TRY,
  CURRENCY_TWD,
  CURRENCY_USD,
  CURRENCY_ZAR
]

// Languages
export const LANG_AFRIKAANS = 'Afrikaans'
export const LANG_ENGLISH = 'English'
export const LANG_FILIPINO = 'Filipino'
export const LANG_FRENCH = 'French'
export const LANG_GERMAN = 'German'
export const LANG_INDONESIAN = 'Indonesian'
export const LANG_PORTUGUESE = 'Portuguese'
export const LANG_RUSSIAN = 'Russian'
export const LANG_SERBIAN = 'Serbian'
export const LANG_SPANISH = 'Spanish'
export const LANG_SWEDISH = 'Swedish'

export const LANGUAGES = [
  LANG_AFRIKAANS,
  LANG_ENGLISH,
  LANG_FILIPINO,
  LANG_FRENCH,
  LANG_GERMAN,
  LANG_INDONESIAN,
  LANG_PORTUGUESE,
  LANG_RUSSIAN,
  LANG_SERBIAN,
  LANG_SPANISH,
  LANG_SWEDISH  
]

// Actions
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_CURRENCY = 'SET_CURRENCY'
export const SET_WALLET_PIN = 'SET_WALLET_PIN'

export function setWalletPin(pin) {
  return {
    type: SET_WALLET_PIN,
    pin
  }
}

export function setLanguage(language){
  return {
    type: SET_LANGUAGE,
    language
  }
}

export function setCurrency(currency){
  return {
    type: SET_CURRENCY,
    currency
  }
}
