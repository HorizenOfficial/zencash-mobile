// @flow
import type { TRANSLATION_OBJ } from '../types'

export const ENGLISH_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'loading...',
    address: 'Address',
    privateKey: 'Private Key',
    cancel: 'Cancel',
    fees: 'Fees',
    version: 'Version',
    in: 'In',
    out: 'Out'
  },
  MainPage: {
    title: 'ZEN Wallet',
    value: 'Value',
    send: 'Send',
    received: 'Received',
    sent: 'Sent',
    noTxFound: 'No transaction history found.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Copy Address To Clipboard'
  },
  SendPage: {
    title: 'Send ZEN',
    payTo: 'Pay To',
    amountToPay: 'Amount To Pay',
    balance: 'Balance',
    networkFee: 'Network Fee',
    slowTx: 'Slow Tx',
    fastTx: 'Fast Tx',
    from: 'From',
    toAddress: 'To Address',
    amount: 'Amount',
    max: 'Max',
    send: 'Send',
    txSuccessful: 'Transcation successful! Click here to see your transaction.',
    confirmSend: 'I want to send these ZEN',
    invalidAddress: 'Invalid `To Address` Only transparent addresses are supported at this point in time.',
    invalidAmount: 'Invalid `Amount`.',
    invalidFee: 'Invalid `Fees`. Try 0 :)',
    zeroAmount: 'Amount must be greater than 0.',
    notEnoughZEN: 'Not enough confirmed ZEN in account to perform transaction.',
    noCameraPermissions: 'No camera permissions. You can allow camera access in your settings.'
  },
  TxDetailPage: {
    txid: 'Transaction Id',
    blockhash: 'Block Hash',
    blockheight: 'Block Height',
    confirmations: 'Confirmations'
  },
  SettingsPage: {
    title: 'Settings',
    language: 'Language',
    currency: 'Currency',
    secretPhrase: 'Show Secret Phrase',
    showPrivateKeys: 'Show Private Keys',
    recoverExistingWallet: 'Recover Existing Wallet',
    current: 'Current'
  },
  SecretPhrasePage: {
    title: 'Secret Phrase'
  },
  ShowPrivateKeyPage: {
    title: 'Private Keys'
  },
  RecoverExistingWalletPage: {
    title: 'Recover Existing Wallet',
    secretPhrase: 'Secret Phrase',
    textareaPlaceholder: 'Secret phrase. min 16 characters',
    confirmUnderstand: 'I understand that by recovering the existing wallet, my current wallet will be wiped.',
    recover: 'Recover'
  },
  AboutPage: {
    title: 'About'
  },
  PinPage: {
    changePinTitle: 'Change PIN',
    newPinPageTitle: 'ZEN Wallet Setup',
    verifyPinPageTitle: 'ZEN Wallet PIN Verification',
    setupNewPin: 'Set up a new PIN',
    reenterPin: 'Re-enter your PIN',
    pinsNotSimilar: 'PINs entered do not match',
    invalidPin: 'Invalid PIN',
    enterYourPin: 'Enter your PIN'
  }
}
