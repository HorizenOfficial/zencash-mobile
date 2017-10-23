// @flow
import type { TRANSLATION_OBJ } from '../types'

export const CHINESE_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: '加载...',
    address: '地址',
    privateKey: '密钥',
    cancel: '取消',
    fees: '费用',
    version: '版',
    in: '输入',
    out: '输出'
  },
  MainPage: {
    title: 'ZEN 钱包',
    value: '价值',
    send: '发',
    received: '收',
    sent: '发',
    noTxFound: '空交易记录',
    noConnection: '没信号'
  },
  AddressInfoPage: {
    copyToClipboard: '复制地址'
  },
  SendPage: {
    title: '发 ZEN',
    payTo: '支付',
    amountToPay: '支付金额',
    balance: '余额',
    networkFee: '网络费',
    slowTx: '慢',
    fastTx: '快',
    from: '从',
    toAddress: '至',
    amount: '数量',
    max: '都',
    send: '发',
    txSuccessful: '交易成功！ 点击这里查看。',
    confirmSend: '我确认要发送这些 ZEN',
    invalidAddress: '无效 `支付地址` 暂时只允许透明地址',
    invalidAmount: '无效 `数量`。',
    invalidFee: '无效 `费用`。',
    zeroAmount: '数量要多过 0。',
    notEnoughZEN: '您钱包不够 ZEN 来做这个交易。',
    noCameraPermissions: '你需要允许 ZEN 钱包使用你的相机。'
  },
  TxDetailPage: {
    txid: '交易',
    blockhash: '哈希',
    blockheight: '区块',
    confirmations: '确认数'
  },
  SettingsPage: {
    title: '设置',
    language: '语言',
    currency: '货币',
    secretPhrase: '揭示密短语',
    showPrivateKeys: '揭示密钥',
    recoverExistingWallet: '取回旧钱包',
    current: '现'
  },
  SecretPhrasePage: {
    title: '密短语'
  },
  ShowPrivateKeyPage: {
    title: '密钥'
  },
  RecoverExistingWalletPage: {
    title: '取回旧钱包',
    secretPhrase: '密短语',
    textareaPlaceholder: '密短语. 极少 16 英文字符。',
    confirmUnderstand: '我明白如果我取回旧钱包，我目前的钱包会消失。',
    recover: '取回'
  },
  AboutPage: {
    title: '关于'
  },
  PinPage: {
    changePinTitle: '更改 PIN',
    newPinPageTitle: 'ZEN 钱包安装',
    verifyPinPageTitle: 'ZEN 钱包 PIN 证实',
    setupNewPin: '设置新 PIN',
    reenterPin: '再次输入 PIN',
    pinsNotSimilar: '输入的 PIN 不一样',
    invalidPin: '无效的 PIN',
    enterYourPin: '输入你的 PIN'
  },
  ContactsPage: {
    contacts: '联系笔记本',
    contactsName: '名字',
    contactsAddress: '地址',
    noContactsFound: '无联系。'
  }
}
