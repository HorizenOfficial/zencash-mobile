// @flow
import type { TRANSLATION_OBJ } from '../types'

export const GERMAN_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'Lädt...',
    address: 'Adresse',
    privateKey: 'Privater Schlüssel',
    cancel: 'Abbrechen',
    fees: 'Gebühren',
    version: 'Version',
    in: 'Eingehend',
    out: 'Ausgehend'
  },
  MainPage: {
    title: 'ZEN Wallet',
    value: 'Wert',
    send: 'Senden',
    received: 'Erhalten',
    sent: 'Gesendet',
    noTxFound: 'Keine Transaktionshistorie gefunden.'
  },
  AddressInfoPage: {
    copyToClipboard: 'In die Zwischenablage kopieren'
  },
  SendPage: {
    title: 'Sende ZEN',
    payTo: 'Zahle an',
    amountToPay: 'Zu bezahlender Betrag',
    balance: 'Guthaben',
    networkFee: 'Netzwerkgebühr',
    slowTx: 'Langsame Tx',
    fastTx: 'Schnelle Tx',
    from: 'Von',
    toAddress: 'Empfängeradresse',
    amount: 'Betrag',
    max: 'Maximum',
    send: 'Senden',
    txSuccessful: 'Transaktion erfolgreich! Drücken Sie hier um die Transaktion einzusehen.',
    confirmSend: 'Ich möchte diese ZEN senden',
    invalidAddress: 'Ungültige Empfängeradresse. Nur transparente (öffentliche) Adressen werden derzeit unterstüzt.',
    invalidAmount: 'Ungültiger Betrag.',
    invalidFee: 'Ungültige Gebühren. Versuchen Sie 0 :)',
    zeroAmount: 'Betrag muss größer als 0 sein.',
    notEnoughZEN: 'Nicht genügend bestätigte ZEN im Benutzerkonto, um diese Transaktion auszuführen.',
    noCameraPermissions: 'Keine Berechtigungen zur Kameranutzung. Diese Funktion kann in den Einstellungen geändert werden.'
  },
  TxDetailPage: {
    txid: 'Transaktionsnummer',
    blockhash: 'Block Hash',
    blockheight: 'Block Höhe',
    confirmations: 'Bestätigungen'
  },
  SettingsPage: {
    title: 'Einstellungen',
    language: 'Sprache',
    currency: 'Währung',
    secretPhrase: 'Zeige geheime Zugangsphrase',
    showPrivateKeys: 'Zeige private Schlüssel',
    recoverExistingWallet: 'Wiederherstellung eines früheren Wallets',
    current: 'Derzeitige'
  },
  SecretPhrasePage: {
    title: 'Geheime Zugangswörter'
  },
  ShowPrivateKeyPage: {
    title: 'Private Schlüssel'
  },
  RecoverExistingWalletPage: {
    title: 'Wallet-Wiederherstellung',
    secretPhrase: 'Geheime Zugangsphrase',
    textareaPlaceholder: 'Geheime Zugangsphrase (mind. 16 Buchstaben)',
    confirmUnderstand: 'Ich habe verstanden, dass bei der Wiederherstellung meine aktuelle Wallet gelöscht wird!',
    recover: 'Wiederherstellen'
  },
  AboutPage: {
    title: 'Über'
  },
  PinPage: {
    changePinTitle: 'PIN ändern',
    newPinPageTitle: 'ZEN Brieftasche einrichten',
    verifyPinPageTitle: 'ZEN Wallet PIN Verifizierung',
    setupNewPin: 'Neue PIN festlegen',
    reenterPin: 'PIN erneut eingeben',
    pinsNotSimilar: 'PINs stimmen nicht überein',
    invalidPin: 'Ungültige PIN',
    enterYourPin: 'PIN Eingeben'
  }
}
