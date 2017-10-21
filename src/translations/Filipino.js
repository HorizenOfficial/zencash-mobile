// @flow
import type { TRANSLATION_OBJ } from '../types'

export const FILIPINO_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'Nagsisimula...',
    address: 'Address',
    privateKey: 'Pribadong Susi',
    cancel: 'Kansela',
    fees: 'Babayaran sa Network',
    version: 'Bersyon',
    in: 'Papasok',
    out: 'Palabas'
  },
  MainPage: {
    title: 'ZEN Wallet',
    value: 'Halaga',
    send: 'Padala',
    received: 'Natanggap',
    sent: 'Napadala',
    noTxFound: 'Walang pang transaksiyon.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Kopyahin ang Address sa Clipboard'
  },
  SendPage: {
    title: 'Magpadala ng ZEN',
    payTo: 'Ipadala sa',
    amountToPay: 'Halaga na Ipadala',
    balance: 'Balanse',
    networkFee: 'Bayad sa Network',
    slowTx: 'Mabagal na Tx',
    fastTx: 'Mabilis na Tx',
    from: 'Mula sa',
    toAddress: ' Address na Papadalhan',
    amount: 'Halaga',
    max: 'Lahat na puwede',
    send: 'Ipadala',
    txSuccessful: 'Tagumpay na Transaksiyon! Click dito para makita ang detalye ng transaksiyon.',
    confirmSend: 'Gusto ko ipadala ang ZEN na ito.',
    invalidAddress: 'Hindi tamang `Papadalhang Address` transparent na addresses lang ang supportado sa ngayon.',
    invalidAmount: 'Hindi tamang `Halaga`.',
    invalidFee: 'Hindi tamang `Bayad` o kulang. Subukan 0 :)',
    zeroAmount: 'Mas mataaas sa halagang 0 ang kailangan.',
    notEnoughZEN: 'Hindi sapat na kumpirmadong ZEN sa account para gawin ang transaksiyon.',
    noCameraPermissions: 'Walang pahintulot sa camera. Pwede mong pahintulutan ang camera sa iyong settings.'
  },
  TxDetailPage: {
    txid: 'Transaksyong Id',
    blockhash: 'Block Hash',
    blockheight: 'Block Height',
    confirmations: 'Mga Kumpirmasyon'
  },
  SettingsPage: {
    title: 'Settings',
    language: 'Lengguwahe',
    currency: 'Salapi',
    secretPhrase: 'Pakita ang Pribadong Parilala',
    showPrivateKeys: 'Pakita ang Pribadong Susi',
    recoverExistingWallet: 'Magbalik ng dating Wallet',
    current: 'Kasalukuyan'
  },
  SecretPhrasePage: {
    title: 'Pribadong Parilala'
  },
  ShowPrivateKeyPage: {
    title: 'Pribadong Susi'
  },
  RecoverExistingWalletPage: {
    title: 'Magbalik ng dating Wallet',
    secretPhrase: 'Pribadong Parilala',
    textareaPlaceholder: 'Pribadong Parirala. Hindi dapat bababa sa 16 na letra o numero',
    confirmUnderstand: 'Naintindihan ko na pag binalik ko ang dating wallet, ang kasalukuyang wallet ay mabubura.',
    recover: 'Ibalik ang dating Wallet'
  },
  AboutPage: {
    title: 'Karagdagang Impormasiyon'
  },
  PinPage: {
    changePinTitle: 'Palitan ang PIN',
    newPinPageTitle: 'ZEN Wallet Setup',
    verifyPinPageTitle: 'Pagpapatunay ng ZEN Wallet PIN',
    setupNewPin: 'Gumawa ng bagong PIN',
    reenterPin: 'Lagay ulit ang PIN',
    pinsNotSimilar: 'Hindi tugma ang PINs na nailagay',
    invalidPin: 'Hindi tamang PIN',
    enterYourPin: 'Lagay ang iyong PIN'
  }
}
