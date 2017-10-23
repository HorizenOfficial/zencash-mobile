// @flow

export type TRANSLATION_OBJ = {
  General: {
    loading: string,
    address: string,
    privateKey: string,
    cancel: string,
    fees: string,
    version: string,
    in: string,
    out: string
  },
  MainPage: {
    title: string,
    value: string,
    send: string,
    received: string,
    sent: string,
    noTxFound: string,
    noConnection: string
  },
  AddressInfoPage: {
    copyToClipboard: string,
  },
  SendPage: {
    title: string,
    payTo: string,
    amountToPay: string,
    balance: string,
    networkFee: string,
    slowTx: string,
    fastTx: string,
    from: string,
    toAddress: string,
    amount: string,
    max: string,
    send: string,
    txSuccessful: string,
    confirmSend: string,
    invalidAddress: string,
    invalidAmount: string,
    invalidFee: string,
    zeroAmount: string,
    notEnoughZEN: string,
    noCameraPermissions: string
  },
  TxDetailPage: {
    txid: string,
    blockhash: string,
    blockheight: string,
    confirmations: string,
  },
  SettingsPage: {
    title: string,
    language: string,
    currency: string,
    secretPhrase: string,
    showPrivateKeys: string,
    recoverExistingWallet: string,
    current: string
  },
  SecretPhrasePage: {
    title: string
  },
  ShowPrivateKeyPage: {
    title: string
  },
  RecoverExistingWalletPage: {
    title: string,
    secretPhrase: string,
    textareaPlaceholder: string,
    confirmUnderstand: string,
    recover: string
  },
  AboutPage: {
    title: string,
  },
  PinPage: {
    changePinTitle: string,
    newPinPageTitle: string,
    verifyPinPageTitle: string,
    setupNewPin: string,
    reenterPin: string,
    pinsNotSimilar: string,
    invalidPin: string,
    enterYourPin: string
  },
  ContactsPage: {
    contacts: string,
    contactsName: string,
    contactsAddress: string,
    noContactsFound: string
  }
}

export type CONTACT = {
  name: string,
  address: string
}
