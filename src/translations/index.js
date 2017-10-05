import {
  LANG_ENGLISH,
  LANG_RUSSIAN,
  LANG_PORTUGUESE
} from '../actions/Settings'

import { ENGLISH_TRANSLATION } from './English.js'
import { RUSSIAN_TRANSLATION } from './Russian.js'
import { PORTUGUESE_TRANSLATION } from './Portuguese.js'

var translations = {}

// Translations we have so far
translations[LANG_ENGLISH] = ENGLISH_TRANSLATION
translations[LANG_RUSSIAN] = RUSSIAN_TRANSLATION
translations[LANG_PORTUGUESE] = PORTUGUESE_TRANSLATION

export default translations