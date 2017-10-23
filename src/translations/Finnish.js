// @flow
import type { TRANSLATION_OBJ } from '../types'

export const ENGLISH_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'ladataan...',
    address: 'Osoite',
    privateKey: 'Yksityinen avain',
    cancel: 'Peruuta',
    fees: 'Palkkiot',
    version: 'Versio',
    in: 'Saapuva',
    out: 'Lähtevä'
  },
  MainPage: {
    title: 'ZEN Wallet',
    value: 'Arvo',
    send: 'Lähetä',
    received: 'Vastaanotettu',
    sent: 'Lähetetty',
    noTxFound: 'Tapahtumahistoriaa ei löytynyt.',
    noConnection: 'Yhteys evätty.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Kopioi osoite leikepöydälle'
  },
  SendPage: {
    title: 'Lähetä ZEN',
    payTo: 'Vastaanottaja',
    amountToPay: 'Lähetettävä määrä',
    balance: 'Saldo',
    networkFee: 'Verkon palkkio',
    slowTx: 'Hidas Tx',
    fastTx: 'Nopea Tx',
    from: 'Mistä',
    toAddress: 'Vastaanottajan osoite',
    amount: 'Määrä',
    max: 'Max',
    send: 'Lähetä',
    txSuccessful: 'Lähetys onnistunut! Tästä painamalla näet tapahtuman.',
    confirmSend: 'Haluan lähettää nämä ZEN',
    invalidAddress: 'Virheellinen vastaanottajan osoite. Vain läpinäkyvät osoitteet on sallittu.',
    invalidAmount: 'Virheellinen määrä.',
    invalidFee: 'Virheellinen palkkio. Valitse 0 :)',
    zeroAmount: 'Määrän täytyy olla enemmän kuin 0.',
    notEnoughZEN: 'Lähetysosoitteen vahvistettu saldo ei riitä tapahtuman toteuttamiseen.',
    noCameraPermissions: 'Ei lupaa kameran käyttöön. Voit sallia kameran käytön puhelimen asetuksista.'
  },
  TxDetailPage: {
    txid: 'Tapahtuma Id',
    blockhash: 'Lohkon tarkistussumma',
    blockheight: 'Lohkon korkeus',
    confirmations: 'Vahvistuksia'
  },
  SettingsPage: {
    title: 'Asetukset',
    language: 'Kieli',
    currency: 'Valuutta',
    secretPhrase: 'Näytä salainen lause',
    showPrivateKeys: 'Näytä yksityiset avaimet',
    recoverExistingWallet: 'Palauta olemassa oleva lompakko',
    current: 'Nykyinen'
  },
  SecretPhrasePage: {
    title: 'Salainen lause'
  },
  ShowPrivateKeyPage: {
    title: 'Yksityiset avaimet'
  },
  RecoverExistingWalletPage: {
    title: 'Palauta olemassa oleva lompakko',
    secretPhrase: 'Salainen lause',
    textareaPlaceholder: 'Salainen lause, vähintään 16 merkkiä',
    confirmUnderstand: 'Ymmärrän, että palauttamalla olemassa olevan lompakon, nykyinen lompakko poistetaan.',
    recover: 'Palauta'
  },
  AboutPage: {
    title: 'Tietoja'
  },
  PinPage: {
    changePinTitle: 'Vaihda PIN',
    newPinPageTitle: 'ZEN Wallet määrittäminen',
    verifyPinPageTitle: 'ZEN Wallet PIN-kysely',
    setupNewPin: 'Anna uusi PIN',
    reenterPin: 'Vahvista uusi PIN',
    pinsNotSimilar: 'Annetut PIN-luvut eivät täsmää',
    invalidPin: 'Virheellinen PIN',
    enterYourPin: 'Anna PIN'
  },
  ContactsPage: {
    contacts: 'Yhteystiedot',
    contactsName: 'Nimi',
    contactsAddress: 'Osoite',
    noContactsFound: 'No contacts found.'
  }
}
