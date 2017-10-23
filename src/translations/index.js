import {
  LANG_ENGLISH,
  LANG_FILIPINO,
  LANG_FRENCH,
  LANG_GERMAN,
  LANG_INDONESIAN,
  LANG_PORTUGUESE,
  LANG_RUSSIAN,
  LANG_SERBIAN,
  LANG_SPANISH,
  LANG_SWEDISH,
  LANG_AFRIKAANS,
  LANG_CHINESE
} from '../actions/Settings'

import { AFRIKAANS_TRANSLATION } from './Afrikaans.js'
import { ENGLISH_TRANSLATION } from './English.js'
import { CHINESE_TRANSLATION } from './Chinese.js'
import { FILIPINO_TRANSLATION } from './Filipino.js'
import { FRENCH_TRANSLATION } from './French.js'
import { GERMAN_TRANSLATION } from './German.js'
import { INDONESIAN_TRANSLATION } from './Indonesian.js'
import { PORTUGUESE_TRANSLATION } from './Portuguese.js'
import { RUSSIAN_TRANSLATION } from './Russian.js'
import { SERBIAN_TRANSLATION } from './Serbian.js'
import { SPANISH_TRANSLATION } from './Spanish.js'
import { SWEDISH_TRANSLATION } from './Swedish.js'

var translations = {}

// Translations we have so far
translations[LANG_AFRIKAANS] = AFRIKAANS_TRANSLATION
translations[LANG_CHINESE] = CHINESE_TRANSLATION
translations[LANG_ENGLISH] = ENGLISH_TRANSLATION
translations[LANG_FILIPINO] = FILIPINO_TRANSLATION
translations[LANG_FRENCH] = FRENCH_TRANSLATION
translations[LANG_GERMAN] = GERMAN_TRANSLATION
translations[LANG_INDONESIAN] = INDONESIAN_TRANSLATION
translations[LANG_PORTUGUESE] = PORTUGUESE_TRANSLATION
translations[LANG_RUSSIAN] = RUSSIAN_TRANSLATION
translations[LANG_SERBIAN] = SERBIAN_TRANSLATION
translations[LANG_SPANISH] = SPANISH_TRANSLATION
translations[LANG_SWEDISH] = SWEDISH_TRANSLATION

export default translations
