// @flow
import type { TRANSLATION_OBJ } from '../types'

export const DUTCH_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'laden...',
    address: 'Adres',
    privateKey: 'Prive Sleutel',
    cancel: 'Annuleren',
    fees: 'Kosten',
    version: 'Versie',
    in: 'In',
    out: 'Uit'
  },
  MainPage: {
    title: 'ZEN Portefeuille',
    value: 'Waarde',
    send: 'Verstuur',
    received: 'Ontvangen',
    sent: 'Verzonden',
    noTxFound: 'Geen transactie historie gevonden.',
    noConnection: 'Geen Connectie'
  },
  AddressInfoPage: {
    copyToClipboard: 'Kopieer Adres Naar klembord'
  },
  SendPage: {
    title: 'Stuur ZEN',
    payTo: 'Betaal Aan',
    amountToPay: 'Bedrag Om Te Betalen',
    balance: 'Balans',
    networkFee: 'Netwerk Kosten',
    slowTx: 'Langzame Tx',
    fastTx: 'Snelle Tx',
    from: 'Van',
    toAddress: 'Naar Adres',
    amount: 'Bedrag',
    max: 'Max',
    send: 'Stuur',
    txSuccessful: 'Transacatie succesvol! Klik hier om jouw transactie te zien.',
    confirmSend: 'Ik wil deze ZEN verzenden',
    invalidAddress: 'Ongeldig `Naar Adres`. Alleen transparante adressen worden op dit moment ondersteund.',
    invalidAmount: 'Ongeldig `Bedrag`',
    invalidFee: 'Ongeldige `Kosten`. Probeer 0 :)',
    zeroAmount: 'Bedrag moet groter zijn dan 0',
    notEnoughZEN: 'Niet genoeg ZEN om deze transactie uit te voeren.',
    noCameraPermissions: 'Geen camera toegang. U kunt de camera toegang in de instellingen beheren.'
  },
  TxDetailPage: {
    txid: 'Transactie Id',
    blockhash: 'Blok Hash',
    blockheight: 'Blok Hoogte',
    confirmations: 'Bevestigingen'
  },
  SettingsPage: {
    title: 'Instellingen',
    language: 'Taal',
    currency: 'Eenheid',
    secretPhrase: 'Toon Geheime Zin',
    showPrivateKeys: 'Toon Prive Sleutel',
    recoverExistingWallet: 'Herstel Bestaande Portefeuille',
    current: 'Current'
  },
  SecretPhrasePage: {
    title: 'Geheime Zin'
  },
  ShowPrivateKeyPage: {
    title: 'Prive Sleutel'
  },
  RecoverExistingWalletPage: {
    title: 'Herstel Bestaande Portefeuille',
    secretPhrase: 'Geheime Zin',
    textareaPlaceholder: 'Geheime Zin. min 16 tekens',
    confirmUnderstand: 'Ik begrijp dat bij het herstellen van mijn bestaande portefeuille mijn huidige portefeuille verloren gaat.',
    recover: 'Herstel'
  },
  AboutPage: {
    title: 'Over'
  },
  PinPage: {
    changePinTitle: 'Verander PIN',
    newPinPageTitle: 'ZEN Portefuille Installatiewizard',
    verifyPinPageTitle: 'ZEN Portefuille PIN Verificatie',
    setupNewPin: 'Stel een nieuwe PIN in',
    reenterPin: 'Voer jouw PIN nogmaals in',
    pinsNotSimilar: 'Ingevoerde PIN komt niet overeen',
    invalidPin: 'Ongeldige PIN',
    enterYourPin: 'Voer Uw PIN in'
  },
  ContactsPage: {
    contacts: 'Contacten',
    contactsName: 'Naam',
    contactsAddress: 'Adres',
    noContactsFound: 'Geen contacten gevonden.'
  }
}
