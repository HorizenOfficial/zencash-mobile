import {
    LANG_ENGLISH,
    LANG_RUSSIAN,
    LANG_GERMAN
} from '../actions/Settings'

import { ENGLISH_TRANSLATION } from './English.js'
import { RUSSIAN_TRANSLATION } from './Russian.js'
import { GERMAN_TRANSLATION } from './German.js'

var translations = {};

// Translations we have so far
translations[LANG_ENGLISH] = ENGLISH_TRANSLATION;
translations[LANG_RUSSIAN] = RUSSIAN_TRANSLATION;
translations[LANG_GERMAN] = GERMAN_TRANSLATION;

export default translations